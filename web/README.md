# Travelog — Web App

The Next.js 16 (App Router) frontend and backend for [Travelog](../README.md). See the root README for project overview, features, and setup instructions.

## Scripts

```bash
npm run dev     # start the dev server (Turbopack) on http://localhost:3000
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Environment variables

This app requires a `.env.local` in this directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
