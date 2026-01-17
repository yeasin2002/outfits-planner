# Outfit Planner - Native App

A cross-platform mobile application for managing your wardrobe and planning outfits, built with Expo and React Native.

## 📱 Overview

Outfit Planner is a modern mobile app that helps users organize their wardrobe, create outfit combinations, and plan their daily looks. The app features user authentication, wardrobe management, outfit creation, and AI-powered outfit suggestions.

### Key Features

- 🔐 **User Authentication** - Secure sign-in/sign-up with Better Auth
- 👔 **Wardrobe Management** - Organize and categorize your clothing items
- 👗 **Outfit Creation** - Mix and match items to create outfits
- ⭐ **Favorites** - Save your favorite outfits for quick access
- 🤖 **AI Picks** - Get AI-powered outfit suggestions
- 🌓 **Theme Support** - Light and dark mode with system preference detection
- 📱 **Cross-Platform** - iOS, Android, and Web support

## 🛠 Tech Stack

### Core Framework

- **Expo SDK 54** - Universal React Native platform
- **Expo Router v6** - File-based routing with typed routes
- **React Native 0.81.5** - Mobile framework
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe development (strict mode)

### UI & Styling

- **HeroUI Native v1.0.0-beta.9** - Component library
- **Tailwind CSS v4** - Utility-first styling
- **Uniwind v1.2.2** - Native Tailwind support for React Native
- **tailwind-variants** & **tailwind-merge** - Style composition
- **@expo/vector-icons** - Icon library (Ionicons, MaterialIcons)

### Navigation

- **Expo Router** - File-based routing
- **@react-navigation/drawer** - Drawer navigation
- Nested drawer + tabs layout pattern

### Authentication

- **Better Auth** - Modern authentication library
- **@better-auth/expo** - Expo integration
- **expo-secure-store** - Secure token storage

### Animation & Gestures

- **react-native-reanimated v4.1.1** - Smooth animations
- **react-native-gesture-handler v2.28.0** - Touch gestures
- **@gorhom/bottom-sheet v5** - Bottom sheet modals

### Form Management

- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation
- **Zod** - Schema validation

### Development Tools

- **TypeScript** - Static type checking
- **Metro** - JavaScript bundler
- **pnpm** - Package manager (monorepo workspace)

## 📁 Project Structure

```
apps/native/
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout (providers, gesture handler)
│   ├── +not-found.tsx            # 404 screen
│   ├── modal.tsx                 # Modal screen (presentation: modal)
│   ├── (auth)/                   # Authentication group
│   │   ├── _layout.tsx           # Auth layout config
│   │   ├── login.tsx             # Login screen
│   │   ├── signup.tsx            # Sign up screen
│   │   ├── forgot-password.tsx   # Password recovery
│   │   ├── reset-password.tsx    # Password reset
│   │   └── verify-otp.tsx        # OTP verification
│   └── (drawer)/                 # Drawer navigation group
│       ├── _layout.tsx           # Drawer layout with bottom nav
│       ├── index.tsx             # Home screen
│       ├── wardrobe.tsx          # Wardrobe management
│       └── outfits/              # Outfits section
│           ├── index.tsx         # My Outfits (default)
│           └── favorites.tsx     # Favorite outfits
├── components/                   # Reusable UI components
│   ├── bottom-navigation.tsx    # Bottom tab navigation
│   ├── container.tsx            # Screen wrapper (safe area + scroll)
│   ├── outfit-card.tsx          # Outfit display card
│   ├── wardrobe-item-card.tsx   # Wardrobe item card
│   ├── category-filter.tsx      # Category filter chips
│   ├── add-item-dialog.tsx      # Add item modal
│   ├── auth-wrapper.tsx         # Auth screen wrapper
│   ├── sign-in.tsx              # Sign-in form
│   ├── sign-up.tsx              # Sign-up form
│   ├── theme-toggle.tsx         # Theme switcher
│   ├── shared/                  # Shared components
│   └── ui/                      # UI primitives
│       └── styled.tsx           # Styled icon components
├── contexts/                    # React context providers
│   └── app-theme-context.tsx   # Theme management
├── lib/                         # Utilities and client configs
│   └── auth-client.ts          # Better Auth client
├── assets/images/              # Static images and icons
├── docs/                       # Documentation
│   ├── auth-screens.md         # Auth screens guide
│   ├── expo-routing-guide.md   # Routing documentation
│   └── figma-design-tokens.md  # Design system tokens
├── .kiro/steering/             # Project guidelines
│   ├── design-system.md        # Design system rules
│   ├── heroui-native-guide.md  # Component library guide
│   ├── product.md              # Product overview
│   ├── structure.md            # Project structure
│   └── tech.md                 # Tech stack details
├── global.css                  # Tailwind CSS entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── .env                        # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (macOS only) or **Android Studio** (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd outfit-planner/apps/native
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:

   ```env
   EXPO_PUBLIC_SERVER_URL=http://your-backend-url
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   pnpm start
   ```

### Running on Devices

#### iOS (macOS only)

```bash
pnpm ios
```

#### Android

```bash
pnpm android
```

#### Web

```bash
pnpm web
```

### Building for Production

Generate native projects:

```bash
pnpm prebuild
```

## 🎨 Design System

### Color Palette

The app uses a carefully crafted color system defined in Figma:

- **Primary**: `#686F60` - Main brand color
- **Secondary Base**: `#B48B5F` - Accent color
- **Secondary Dark**: `#EE9250` - Active states
- **Base**: `#F7F5ED` - Background surfaces
- **Black**: `#000000` - Primary text
- **White**: `#FFFFFF` - Light text/backgrounds
- **Subtext**: `#828282` - Secondary text

### Typography

- **Headers**: Caudex Bold (16px, line-height: 1.2)
- **Body Text**: Lora Regular (14px, 12px, 10px variants)
- **System Text**: Urbanist SemiBold (16px, tracking: 0.2px)

### Component Library

The app uses **HeroUI Native** as the primary component library:

- `Button` - Interactive buttons with loading states
- `TextField` - Form inputs with labels
- `Tabs` - Tab navigation with indicators
- `Card` - Content containers
- `Surface` - Background surfaces
- `Chip` - Status indicators
- `Spinner` - Loading indicators
- `Dialog` - Modal dialogs
- `BottomSheet` - Bottom sheet modals

### Styling Approach

- **Utility-first** with Tailwind CSS via Uniwind
- **Theme-aware** components with light/dark mode support
- **Type-safe** styling with TypeScript
- **Responsive** layouts with flexbox

Example:

```tsx
import { Button } from "heroui-native";

<Button onPress={handleSubmit} isDisabled={isLoading}>
  {isLoading ? <Spinner size="sm" /> : <Button.Label>Submit</Button.Label>}
</Button>;
```

## 🧭 Navigation Structure

### Route Groups

- **(auth)** - Authentication screens (login, signup, etc.)
- **(drawer)** - Main app screens with drawer navigation
  - Bottom navigation overlay for quick access
  - Nested routes for outfits section

### Bottom Navigation

Fixed bottom navigation bar with 4 tabs:

- **Home** - Dashboard and overview
- **Wardrobe** - Clothing item management
- **Outfits** - Outfit creation and browsing
- **Settings** - App settings and preferences

### Deep Linking

The app supports deep linking with the scheme: `outfit-planner://`

## 🔐 Authentication

Authentication is handled by **Better Auth** with Expo integration:

- Email/password authentication
- Secure token storage with `expo-secure-store`
- OTP verification support
- Password reset flow
- Protected routes with auth wrapper

## 📦 Key Components

### Container

Screen wrapper that handles safe area insets and scrolling:

```tsx
<Container className="p-6">{/* Screen content */}</Container>
```

### OutfitCard

Reusable card for displaying outfits:

```tsx
<OutfitCard
  id={outfit.id}
  title={outfit.title}
  category={outfit.category}
  image={outfit.image}
  isFavorite={outfit.isFavorite}
  onPress={handlePress}
  onToggleFavorite={toggleFavorite}
/>
```

### BottomNavigation

Persistent bottom navigation across drawer screens:

- Auto-highlights active route
- Smooth navigation transitions
- Icon + label display

## 🎯 Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow **functional component** patterns
- Use **named exports** for components
- Apply **Tailwind classes** via `className` prop
- Use **HeroUI Native** components when available

### Component Patterns

1. **Always use HeroUI Native components** instead of raw React Native components
2. **Compound component pattern** - Use subcomponents (e.g., `Button.Label`)
3. **Theme-aware** - Use `useThemeColor()` for dynamic colors
4. **Accessibility** - All components follow mobile a11y best practices

### File Naming

- **Screens**: `kebab-case.tsx` (e.g., `forgot-password.tsx`)
- **Components**: `kebab-case.tsx` (e.g., `outfit-card.tsx`)
- **Layouts**: `_layout.tsx`
- **Not Found**: `+not-found.tsx`

### Path Aliases

Use `@/*` for imports:

```tsx
import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
```

## 🧪 Testing

```bash
# Run tests (when configured)
pnpm test
```

## 📱 Platform-Specific Notes

### iOS

- Requires macOS for development
- Uses CocoaPods for native dependencies
- Supports iOS 13.4+

### Android

- Requires Android Studio
- Minimum SDK: 21 (Android 5.0)
- Target SDK: 34 (Android 14)

### Web

- Uses Metro bundler
- Responsive design with mobile-first approach
- Progressive Web App (PWA) ready

## 🔧 Configuration

### Expo Configuration (`app.json`)

- **Scheme**: `outfit-planner`
- **Orientation**: Default (portrait + landscape)
- **Typed Routes**: Enabled
- **React Compiler**: Enabled (experimental)

### TypeScript Configuration

- **Strict mode**: Enabled
- **Path aliases**: `@/*` maps to project root
- **JSX**: React

## 📚 Documentation

Additional documentation is available in the `/docs` directory:

- **auth-screens.md** - Authentication flow documentation
- **expo-routing-guide.md** - Routing patterns and best practices
- **figma-design-tokens.md** - Design system tokens from Figma

Steering documentation in `.kiro/steering/`:

- **design-system.md** - Complete design system rules
- **heroui-native-guide.md** - Component library usage guide
- **product.md** - Product overview and features
- **structure.md** - Project structure conventions
- **tech.md** - Tech stack details and commands

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use HeroUI Native components
3. Write TypeScript with strict mode
4. Test on both iOS and Android
5. Update documentation for new features

## 📄 License

[Add your license here]

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [HeroUI Native](https://v3.heroui.com/docs/native)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Better Auth](https://www.better-auth.com/)

## 🐛 Troubleshooting

### Common Issues

**Metro bundler cache issues:**

```bash
pnpm dev --clear
```

**iOS build issues:**

```bash
cd ios && pod install && cd ..
pnpm ios
```

**Android build issues:**

```bash
pnpm prebuild --clean
pnpm android
```

**Type errors:**

```bash
# Regenerate Expo types
npx expo customize tsconfig.json
```

## 📞 Support

For issues and questions:

- Check the `/docs` directory
- Review steering documentation in `.kiro/steering/`
- Open an issue on GitHub

---

**Built with ❤️ using Expo and React Native**
