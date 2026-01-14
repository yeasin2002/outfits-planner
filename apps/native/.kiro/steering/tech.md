# Tech Stack

## Core Framework

- Expo SDK 54 with Expo Router v6 (file-based routing)
- React Native 0.81.5
- React 19.1.0
- TypeScript (strict mode)

## UI & Styling

- HeroUI Native (component library)
- Tailwind CSS v4 with Uniwind (native Tailwind support)
- tailwind-variants and tailwind-merge for style composition
- @expo/vector-icons (Ionicons, MaterialIcons)

## Navigation

- expo-router with typed routes enabled
- @react-navigation/drawer for drawer navigation
- Nested drawer + tabs layout pattern

## Authentication

- Better Auth with @better-auth/expo plugin
- expo-secure-store for secure token storage

## Animation & Gestures

- react-native-reanimated for animations
- react-native-gesture-handler for gestures
- @gorhom/bottom-sheet for bottom sheets

## Validation

- Zod for schema validation

## Monorepo

- Part of a pnpm workspace (@outfit-planner packages)
- Shared env config via @outfit-planner/env

## Common Commands

```bash
# Start development server
npm run dev          # or: expo start --clear

# Platform-specific
npm run ios          # expo run:ios
npm run android      # expo run:android
npm run web          # expo start --web

# Generate native projects
npm run prebuild     # expo prebuild
```

## Environment

- Uses `.env` file for environment variables
- Server URL configured via `EXPO_PUBLIC_SERVER_URL`
