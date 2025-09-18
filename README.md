Neutone — AI Music Generation Platform

Create, iterate on, and share AI‑generated music end‑to‑end. This monorepo contains a Next.js web app for user flows, credit‑gated generation, playback with AWS S3, background processing via Inngest, and a GPU backend deployed on Modal that runs the ACE‑Step music model, a thumbnail generator, and a lightweight prompt/lyrics assistant.


## Features

- **Song generation modes**: full description, prompt + described lyrics, or prompt + custom lyrics
- **GPU backend on Modal**: ACE‑Step music pipeline, SDXL‑Turbo thumbnail generation, Qwen 2.5 for small LLM tasks
- **Background jobs**: Inngest orchestrates generation and updates DB state
- **Postgres + Prisma**: relational models for users, songs, likes, categories, sessions
- **Auth**: Email/password with `better-auth` + ready‑made UI
- **Storage**: AWS S3 for audio and cover images; presigned URLs for streaming
- **Modern frontend**: Next.js App Router (v15), React 19, Tailwind CSS 4


## Monorepo structure

```
.
├─ frontend/            # Next.js 15 app (TypeScript, Prisma, better-auth, Inngest)
│  ├─ prisma/           # Prisma schema & migrations
│  └─ src/
│     ├─ app/           # App Router routes (auth and main)
│     ├─ actions/       # Server actions (queue/generate, etc.)
│     ├─ inngest/       # Inngest client and functions
│     ├─ lib/           # Auth config and client helpers
│     └─ server/        # Prisma client bootstrap
└─ backend/             # Modal app hosting GPU pipelines & API endpoints
   ├─ MusicGenServer.py # Modal class with fastapi endpoints
   ├─ modal_config.py   # Modal app config (image, volumes, secrets)
   ├─ GenerateMusic.py  # Pydantic response models
   └─ ...               # ACE‑Step integration, prompts, etc.
```


## High‑level architecture

```mermaid
graph TD
  U["User / Browser"] --> F["Next.js Frontend (App Router)"]
  F -->|Auth, DB| P[("Postgres via Prisma")]
  F -->|Background event| I["Inngest Functions"]
  I -->|HTTP POST| M["Modal GPU Backend (FastAPI endpoints)"]
  M -->|Upload| S3[("AWS S3 Bucket")]
  F -->|Presigned GetObject| S3
  F -->|Next/Image| S3
```


## Frontend (Next.js)

- Framework: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS 4
- Auth: `better-auth` (email/password) with `@daveyplate/better-auth-ui`
- DB: Prisma with PostgreSQL
- Jobs: Inngest (served via Next.js API route)
- Storage/Streaming: AWS S3 with presigned URLs

Key files:

- `frontend/src/env.js`: runtime env validation (Zod) and server‑side env exposure
- `frontend/src/actions/generate.ts`: queues song generation, S3 presigned URLs
- `frontend/src/inngest/functions.ts`: main generation function; calls Modal endpoints and updates DB
- `frontend/src/app/api/inngest/route.ts`: Inngest HTTP handler for dev/prod
- `frontend/src/lib/auth.ts`: `better-auth` server config (Prisma adapter)
- `frontend/src/server/db.ts`: Prisma client
- `frontend/prisma/schema.prisma`: User, Song, Like, Category, Session, Account, Verification

Useful scripts (from `frontend/package.json`):

- `dev`: run Next.js in dev mode
- `build` / `start`: production build and start
- `check` / `typecheck`: lint + TypeScript checks
- `db:generate`: `prisma migrate dev`
- `db:migrate`: `prisma migrate deploy`
- `db:push`: push schema to DB (no migration history)
- `db:studio`: open Prisma Studio


## Backend (Modal GPU service)

The backend uses [Modal](https://modal.com) to host a GPU‑accelerated FastAPI service:

- Model: ACE‑Step pipeline for music generation (cloned and installed at build)
- Thumbnail: SDXL‑Turbo (Fast inference for album covers)
- Small LLM: Qwen 2.5 for prompt and lyrics assistance
- Storage: Uploads audio and thumbnails to S3

Endpoints (decorated with `@modal.fastapi_endpoint(method="POST", requires_proxy_auth=True)`):

- `generate_from_description`
- `generate_from_lyrics`
- `generate_from_described_lyrics`

These endpoints are deployed as part of the Modal app defined in `backend/modal_config.py` and `backend/MusicGenServer.py`. The frontend posts to these endpoints, passing a Modal proxy auth header.


## Prerequisites

- Node.js 20+ recommended (18.17+ minimum for Next.js 15)
- pnpm, npm, or bun (repo contains `bun.lockb` but any modern manager works)
- Docker or Podman (for local Postgres via helper script)
- Python 3.11 (for backend dev tooling and Modal)
- AWS account + S3 bucket
- Modal account and CLI configured


## Environment variables

Frontend server‑side env (validated in `frontend/src/env.js`):

- `DATABASE_URL` (Postgres connection string)
- `NODE_ENV` (development|test|production)
- `MODAL_KEY`, `MODAL_SECRET` (Modal proxy auth forwarded to backend)
- `AWS_ACCESS_KEY_`, `AWS_SECRET_ACCESS_KEY_`, `AWS_REGION` (S3 client from frontend server)
- `S3_BUCKET_NAME`
- `GENERATE_FROM_DESCRIPTION_ENDPOINT`
- `GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT`
- `GENERATE_FROM_LYRICS_ENDPOINT`
- `BETTER_AUTH_SECRET` (random secret for sessions)
- `BETTER_AUTH_URL` (e.g. `http://localhost:3000` in dev)

Note: The Modal backend uses boto3 and will read cloud credentials using the standard AWS env names (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY_`, `AWS_REGION`) inside Modal. You can safely set both pairs in secrets if you want a shared source.

Example `frontend/.env`:

```
DATABASE_URL=postgresql://postgres:password@localhost:5435/neutone
NODE_ENV=development

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-secure-random-string

AWS_ACCESS_KEY_=...
AWS_SECRET_ACCESS_KEY_=...
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket

MODAL_KEY=...
MODAL_SECRET=...

GENERATE_FROM_DESCRIPTION_ENDPOINT=https://modal-endpoint.example/description
GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT=https://modal-endpoint.example/described-lyrics
GENERATE_FROM_LYRICS_ENDPOINT=https://modal-endpoint.example/lyrics
```


## Local development

1) Clone and install

```
git clone <this-repo>
cd frontend
pnpm install   # or: npm install / bun install
```

2) Start a local Postgres (optional helper)

```
cp .env.example .env  # or create .env based on the example above
./start-database.sh   # uses Docker/Podman; reads DATABASE_URL from .env
```

3) Initialize the database

```
pnpm dlx prisma generate
pnpm db:push           # or: pnpm db:generate for migrations in dev
pnpm db:studio         # optional
```

4) Run the web app

```
pnpm dev
# http://localhost:3000
```

5) Configure Inngest (no separate worker needed)

In dev, `frontend/src/app/api/inngest/route.ts` serves your functions. The route is mounted under `/api/inngest` and driven by the Next.js dev server.

6) Configure Modal backend endpoints

- Ensure you have deployed the Modal app (see next section) and copy the three endpoint URLs into your `frontend/.env` as:
  - `GENERATE_FROM_DESCRIPTION_ENDPOINT`
  - `GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT`
  - `GENERATE_FROM_LYRICS_ENDPOINT`
- Set `MODAL_KEY` and `MODAL_SECRET` to values accepted by your Modal proxy auth (see Modal settings)


## Deploying the Modal backend

1) Install Python tooling and Modal CLI

```
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pip install modal
modal setup   # login and configure
```

2) Create the Modal secret referenced in code

The code uses `modal.Secret.from_name("neutone-secrets")`. Create it and include your bucket and AWS creds (ID/SECRET) and region.

```
modal secret create neutone-secrets \
  --env S3_BUCKET_NAME=your-bucket \
  --env AWS_ACCESS_KEY_ID=... \
  --env AWS_SECRET_ACCESS_KEY_=... \
  --env AWS_REGION=us-east-1
```

3) Deploy or serve the app

You can iterate with live‑reloading via `serve` or deploy to Modal cloud:

```
# Dev (serve) — run from the repo root or backend/
modal serve backend/MusicGenServer.py

# Deploy — returns public FastAPI endpoint URLs
modal deploy backend/MusicGenServer.py
```

Copy the three endpoint URLs into `frontend/.env`.

Optional smoke test: `backend/main.py` contains a local entrypoint that posts to one of the endpoints when run via Modal; it expects `Modal-Key` and `Modal-Secret` present in environment. You can set them (or map from `MODAL_KEY`/`MODAL_SECRET`) for a quick verification.


## Deploying the frontend

- Host on Vercel/Netlify/Docker per your preference (T3 preset docs apply). For Vercel:
  - Set all env vars listed above
  - Use a managed Postgres (Neon, Supabase, RDS, etc.)
  - Run `prisma migrate deploy` as a build/launch step (`pnpm db:migrate`)
  - Ensure `next.config.js` image `remotePatterns` matches your bucket and region


## How generation flows

1) User submits a request → `generateSong` server action creates a `Song` record and emits `generate-song-event`
2) Inngest function `generateSong` reads the song, selects the correct Modal endpoint and request body
3) Function posts to Modal with `Modal-Key`/`Modal-Secret` headers
4) Modal generates audio, uploads `.wav` to S3, generates a PNG cover, uploads to S3, returns keys and categories
5) Inngest updates `Song` with S3 keys, categories, and sets status
6) UI polls or revalidates and retrieves a presigned URL to play


## Troubleshooting

- Env validation fails at boot: ensure every variable in `frontend/src/env.js` is set; use `SKIP_ENV_VALIDATION=1` only for Docker builds
- S3 403 or missing audio: confirm `S3_BUCKET_NAME`, region, and AWS creds; verify bucket CORS and that the file exists
- Modal 401/403: make sure `requires_proxy_auth` headers are set; check `MODAL_KEY`/`MODAL_SECRET` and Modal app settings
- Prisma connection refused: ensure local DB is running on the port in `DATABASE_URL` or switch to a managed Postgres
- Images not loading: confirm `next.config.js` `remotePatterns` matches the bucket host


## License

TBD


