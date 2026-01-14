# outfit-planner

A cross-platform outfit planning application built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack).

## Features

- **TypeScript** - Type safety throughout
- **React Native + Expo** - Mobile app development
- **HeroUI Native** - Component library
- **TailwindCSS** - Utility-first styling via uniwind
- **Hono** - Lightweight backend framework
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database (Neon serverless)
- **Better Auth** - Authentication with Expo support
- **Oxlint + Oxfmt** - Linting and formatting
- **Turborepo** - Monorepo build system

## Getting Started

Install dependencies:

```bash
pnpm install
```

## Database Setup

1. Set up a PostgreSQL database (Neon recommended)
2. Update `apps/server/.env` with your connection details
3. Push the schema:

```bash
pnpm db:push
```

## Development

```bash
pnpm dev          # Start all apps
pnpm dev:native   # Start Expo dev server only
pnpm dev:server   # Start API server only
```

- API runs at [http://localhost:3000](http://localhost:3000)
- Use Expo Go app for mobile development

## Project Structure

```
outfit-planner/
├── apps/
│   ├── native/      # React Native + Expo mobile app
│   └── server/      # Hono API server
├── packages/
│   ├── auth/        # Better Auth configuration
│   ├── config/      # Shared TypeScript config
│   ├── db/          # Drizzle ORM schema & queries
│   └── env/         # Environment variable validation
```

## Scripts

```bash
pnpm dev              # Start all apps
pnpm build            # Build all packages
pnpm check-types      # TypeScript type checking
pnpm check            # Run Oxlint and Oxfmt
pnpm db:push          # Push schema to database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```
