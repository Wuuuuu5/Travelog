# Travelog

**Compare every New Zealand hotel price in one search.**

Travelog is a full-stack hotel price comparison app for travelers exploring Aotearoa — search a destination, pick your dates, and see pricing across booking providers side by side, with authenticated accounts backed by Supabase.

<img width="1653" height="810" alt="Travelog screenshot" src="https://github.com/user-attachments/assets/1fb3d4b6-7b6b-4098-b713-92c1a6756f84" />

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%26%20SSR-3ECF8E?logo=supabase&logoColor=white">
  <img alt="CI" src="https://github.com/Wuuuuu5/Travelog2.0/actions/workflows/test.yml/badge.svg">
</p>

## Overview

The app started as a Vite + Express prototype and was rebuilt from the ground up on Next.js's App Router — moving the backend into Route Handlers, converting the entire codebase to strict TypeScript, and wiring up cookie-based Supabase auth that works correctly across Server Components, Client Components, and middleware. A GitHub Actions pipeline runs a type-checked build and lint on every pull request before it can merge.

## Features

- **Destination search** — an autocomplete search bar (destination, dates, guest count) that builds a shareable query string for results
- **Authentication** — email/password sign-up and login via Supabase, with sessions refreshed transparently by Next.js middleware (`proxy`) on every request
- **Server-rendered by default** — pages are React Server Components unless they need interactivity, keeping the client bundle small
- **Design system** — Tailwind v4 with OKLCH color tokens, light/dark mode support, and hand-tuned entrance animations
- **Type-safe end to end** — 100% TypeScript across routes, components, and the Supabase data layer, with `strict` mode on
- **CI-gated** — every PR to `main` runs a production build, type check, and lint via GitHub Actions

## Tech Stack

| Layer        | Choice                                                        |
| ------------ | -------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack)        |
| UI           | React 19, Tailwind CSS v4, [lucide-react](https://lucide.dev)    |
| Language     | TypeScript (strict mode)                                       |
| Auth & Data  | [Supabase](https://supabase.com) (`@supabase/ssr`)              |
| CI           | GitHub Actions                                                  |

## Project Structure

```
Travelog2.0/
└── web/                        # Next.js app (App Router)
    └── src/
        ├── app/                # Routes: /, /login, /signup, /api/health
        ├── components/         # Navbar, Hero, SearchBar
        ├── lib/supabase/       # Browser, server, and middleware Supabase clients
        └── proxy.ts            # Session-refresh middleware
```

## Getting Started

### Prerequisites
- Node.js 22+
- A [Supabase](https://supabase.com) project (for its URL and anon key)

### Installation

```bash
git clone https://github.com/Wuuuuu5/Travelog2.0.git
cd Travelog2.0
npm run install:all
```

### Environment variables

Create `web/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Roadmap

- [ ] `/search` results page (destination, dates, and guest filters already flow through the URL)
- [ ] Live pricing integration across booking providers
- [ ] Map view of results
