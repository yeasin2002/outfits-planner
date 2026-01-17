# Tech Stack

## Core Framework

- Expo SDK 54 with Expo Router v6 (file-based routing)
- React Native 0.81.5
- React 19.1.0
- TypeScript (strict mode)

## UI & Styling

- HeroUI Native v1.0.0-beta.9 (component library)
- Tailwind CSS v4 with Uniwind v1.2.2 (native Tailwind support)
- tailwind-variants and tailwind-merge for style composition
- tailwindcss-animate for animations
- @expo/vector-icons v15.0.3 (Ionicons, MaterialIcons)

## Navigation

- expo-router v6 with typed routes enabled
- @react-navigation/drawer v7.3.9 for drawer navigation
- @react-navigation/elements v2.8.1 for navigation components
- Nested drawer + tabs layout pattern
- Bottom navigation overlay component

## Authentication

- Better Auth with @better-auth/expo plugin
- expo-secure-store v15.0.7 for secure token storage
- Protected routes with auth wrapper component

## Animation & Gestures

- react-native-reanimated v4.1.1 for animations
- react-native-gesture-handler v2.28.0 for gestures
- react-native-worklets v0.5.1 for worklet support
- @gorhom/bottom-sheet v5 for bottom sheets

## Form Management

- react-hook-form v7.71.1 for form state management
- @hookform/resolvers v5.2.2 for form validation
- Zod for schema validation

## Additional Libraries

- expo-font v14.0.9 for custom fonts
- expo-haptics v15.0.7 for haptic feedback
- expo-image-picker v17.0.10 for image selection
- expo-network v8.0.7 for network status
- expo-constants v18.0.10 for app constants
- expo-linking v8.0.8 for deep linking
- react-native-keyboard-controller v1.18.5 for keyboard handling
- react-native-svg v15.12.1 for SVG support
- class-variance-authority v0.7.1 for variant styling
- clsx v2.1.1 for conditional classes

## Monorepo

- Part of a pnpm workspace (@outfit-planner packages)
- Shared env config via @outfit-planner/env
- Shared config via @outfit-planner/config

## Common Commands

```bash
# Start development server
pnpm dev             # expo start --clear
pnpm start           # expo start

# Platform-specific
pnpm ios             # expo run:ios
pnpm android         # expo run:android
pnpm web             # expo start --web

# Generate native projects
pnpm prebuild        # expo prebuild --clean

# Generate sitemap
pnpm sitemap         # npx expo-router-sitemap
```

## Environment

- Uses `.env` file for environment variables
- Server URL configured via `EXPO_PUBLIC_SERVER_URL`
- Environment variables accessed via `@outfit-planner/env` package

## Expo Configuration

- **Scheme**: `outfit-planner` for deep linking
- **User Interface Style**: Automatic (light/dark mode)
- **Orientation**: Default (portrait + landscape)
- **Typed Routes**: Enabled for type-safe navigation
- **React Compiler**: Enabled (experimental)
- **Plugins**: expo-font
- **Android Package**: com.anonymous.outfitplanner
