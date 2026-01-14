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
