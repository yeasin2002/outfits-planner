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
