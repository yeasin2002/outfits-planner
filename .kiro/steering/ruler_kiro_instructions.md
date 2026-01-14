

<!-- Source: .ruler/bts.md -->

# Better-T-Stack Project Rules

This is a outfit-planner project created with Better-T-Stack CLI.

## Project Structure

This is a monorepo with the following structure:

- **`apps/server/`** - Backend server (Hono)

- **`apps/native/`** - React Native mobile app (with NativeWind)

- **`packages/auth/`** - Authentication logic and utilities
- **`packages/db/`** - Database schema and utilities
- **`packages/env/`** - Shared environment variables and validation
- **`packages/config/`** - Shared TypeScript configuration

## Available Scripts

- `pnpm run dev` - Start all apps in development mode
- `pnpm run dev:server` - Start only the server
- `pnpm run dev:native` - Start only the native app
- `pnpm run build` - Build all apps
- `pnpm run lint` - Lint all packages
- `pnpm run typecheck` - Type check all packages

## Database Commands

All database operations should be run from the server workspace:

- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open database studio
- `pnpm run db:generate` - Generate Drizzle files
- `pnpm run db:migrate` - Run database migrations

Database schema files are located in `packages/db/src/schema/`

## Authentication

Authentication is powered by Better Auth:

- Auth configuration is in `packages/auth/src/`
- Native app auth client is in `apps/native/src/lib/auth-client.ts`

## Project Configuration

This project includes a `bts.jsonc` configuration file that stores your Better-T-Stack settings:

- Contains your selected stack configuration (database, ORM, backend, frontend, etc.)
- Used by the CLI to understand your project structure
- Safe to delete if not needed

## Key Points

- This is a Turborepo monorepo using pnpm workspaces
- Each app has its own `package.json` and dependencies
- Run commands from the root to execute across all workspaces
- Run workspace-specific commands with `pnpm run command-name`
- Turborepo handles build caching and parallel execution
- Git hooks are configured with Lefthook for pre-commit checks



<!-- Source: .ruler/product.md -->

# Outfit Planner

A cross-platform outfit planning application built with the Better-T-Stack.

## Overview

Mobile-first application that helps users plan and organize their outfits. Features user authentication with email/password support.

## Target Platforms

- Mobile (iOS/Android) via React Native + Expo
- Web (planned)
- Backend API server

## Current State

Early development with authentication infrastructure in place. Core outfit planning features are yet to be implemented.



<!-- Source: .ruler/structure.md -->

# Project Structure

```
outfit-planner/
├── apps/
│   ├── native/          # React Native + Expo mobile app
│   │   ├── app/         # Expo Router file-based routes
│   │   │   ├── (drawer)/    # Drawer navigation group
│   │   │   │   └── (tabs)/  # Tab navigation nested in drawer
│   │   │   └── _layout.tsx  # Root layout with providers
│   │   ├── components/  # UI components
│   │   ├── contexts/    # React contexts
│   │   └── lib/         # Utilities (auth client, etc.)
│   │
│   └── server/          # Hono API server
│       └── src/
│           └── index.ts # Server entry point
│
├── packages/
│   ├── auth/            # Better Auth configuration
│   ├── config/          # Shared TypeScript config
│   ├── db/              # Drizzle ORM + schema
│   │   └── src/schema/  # Database tables
│   └── env/             # Environment variable validation
│
└── [config files]       # turbo.json, tsconfig.json, etc.
```

## Conventions

### Package Naming

- Internal packages use `@outfit-planner/` scope
- Import via `workspace:*` in package.json

### Routing (Native)

- File-based routing with Expo Router
- Route groups use parentheses: `(drawer)`, `(tabs)`
- Layouts use `_layout.tsx`

### Database Schema

- Tables defined in `packages/db/src/schema/`
- Export all schemas from `schema/index.ts`
- Use Drizzle's `pgTable` for PostgreSQL

### Environment Variables

- Server env in `apps/server/.env`
- Native env in `apps/native/.env`
- Validated via `@outfit-planner/env` package

### Path Aliases

- Native app uses `@/` alias for root imports



<!-- Source: .ruler/tech.md -->

# Tech Stack

## Build System

- **Turborepo** - Monorepo orchestration
- **pnpm 10.x** - Package manager with workspace support
- **TypeScript 5.x** - Strict mode enabled throughout

## Frontend (Native)

- **React Native 0.81** + **Expo 54** - Mobile framework
- **Expo Router** - File-based routing with typed routes
- **HeroUI Native** - Component library
- **TailwindCSS 4** + **uniwind** - Styling
- **React Native Reanimated** - Animations
- **React Native Gesture Handler** - Touch handling

## Backend

- **Hono** - Lightweight HTTP framework
- **Node.js** - Runtime (also supports Bun compilation)
- **tsdown** - Build tool
- **tsx** - Development runner

## Database

- **PostgreSQL** via **Neon** (serverless)
- **Drizzle ORM** - Type-safe queries and migrations

## Authentication

- **Better Auth** - Auth framework with Expo plugin
- Email/password authentication enabled

## Code Quality

- **Oxlint** - Linting (TypeScript, Unicorn, OXC plugins)
- **Oxfmt** - Formatting
- **Lefthook** - Git hooks

## Common Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:native       # Start Expo dev server
pnpm dev:server       # Start API server

# Database
pnpm db:push          # Push schema to database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio

# Quality
pnpm check            # Run linting and formatting
pnpm check-types      # TypeScript type checking
pnpm build            # Build all packages
```

## Catalog Dependencies

Shared versions managed in `pnpm-workspace.yaml`:

- zod, dotenv, typescript, better-auth, @better-auth/expo
