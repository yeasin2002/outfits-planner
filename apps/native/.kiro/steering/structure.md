# Project Structure

```
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
│       └── outfits/              # Outfits section (nested routes)
│           ├── index.tsx         # My Outfits (default)
│           ├── favorites.tsx     # Favorite outfits
│           └── ai-pick.tsx       # AI-powered outfit suggestions
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
│   ├── auth-screens.md         # Auth screens documentation
│   ├── expo-routing-guide.md   # Routing guide
│   └── figma-design-tokens.md  # Design system tokens
├── .kiro/steering/             # Project guidelines
│   ├── design-system.md        # Design system rules
│   ├── heroui-native-guide.md  # Component library guide
│   ├── product.md              # Product overview
│   ├── structure.md            # Project structure (this file)
│   └── tech.md                 # Tech stack details
├── global.css                  # Tailwind CSS entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── components.json             # Component config
├── uniwind-types.d.ts          # Uniwind type definitions
├── expo-env.d.ts               # Expo type definitions
└── .env                        # Environment variables
```

## Conventions

### Routing

- Route groups use parentheses: `(auth)`, `(drawer)`, `(tabs)`
- Layout files: `_layout.tsx` in each route directory
- Screen files: `index.tsx` or named files like `login.tsx`, `wardrobe.tsx`
- Nested routes: Use folders for sub-sections (e.g., `outfits/index.tsx`, `outfits/favorites.tsx`)
- Special files: `+not-found.tsx` for 404, `modal.tsx` for modals

### Components

- Functional components with named exports
- Use `Container` component for screen wrappers (handles safe area + scroll)
- HeroUI Native components for UI elements (Button, Card, Surface, TextField, Tabs)
- Custom reusable components: `OutfitCard`, `WardrobeItemCard`, `BottomNavigation`
- Styled icon components in `components/ui/styled.tsx`

### Styling

- Tailwind classes via `className` prop (enabled by Uniwind)
- Use `cn()` from heroui-native for conditional class merging
- Theme colors accessed via `useThemeColor()` hook
- Custom hex colors for brand-specific designs:
  - Primary: `#686F60`
  - Secondary Base: `#B48B5F`
  - Secondary Dark: `#EE9250`
  - Base: `#F7F5ED`
  - Subtext: `#828282`

### Typography

- Headers: Caudex Bold (16px, line-height: 1.2)
- Body Text: Lora Regular (14px, 12px, 10px variants)
- System Text: Urbanist SemiBold (16px, tracking: 0.2px)
- Font families accessed via style prop: `fontFamily: "Lora_400Regular"`

### Path Aliases

- `@/*` maps to project root (e.g., `@/components/container`)
- Configured in `tsconfig.json`

### Provider Hierarchy (root layout)

1. GestureHandlerRootView - Gesture support
2. KeyboardProvider - Keyboard handling
3. AppThemeProvider - Theme management (light/dark mode)
4. HeroUINativeProvider - HeroUI components

### Navigation Structure

#### Drawer Navigation

- Main app navigation with side drawer
- Includes: Home, Wardrobe, Outfits, Settings
- Bottom navigation overlay for quick access

#### Bottom Navigation

- Fixed bottom bar across all drawer screens
- 4 tabs: Home, Wardrobe, Outfits, Settings
- Auto-highlights active route
- Implemented in `components/bottom-navigation.tsx`
- Integrated in drawer layout (`app/(drawer)/_layout.tsx`)

#### Nested Routes

- Outfits section uses nested routes
- Tab navigation within outfits: My Outfits, Favorites, AI Pick
- Uses HeroUI Native Tabs component with line variant

### File Naming

- Screens: `kebab-case.tsx` (e.g., `forgot-password.tsx`)
- Components: `kebab-case.tsx` (e.g., `outfit-card.tsx`)
- Layouts: `_layout.tsx`
- Not Found: `+not-found.tsx`
- Index routes: `index.tsx`

### Component Patterns

#### Reusable Cards

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

#### Screen Wrapper

```tsx
<Container className="p-6">
  {/* Screen content */}
</Container>
```

#### Tabs Navigation

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} variant="line">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="tab1">
      <Tabs.Label>Tab 1</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
</Tabs>
```

### Data-Driven Patterns

- Use arrays of objects for navigation items
- Map over data to render components
- Example: Tab items, bottom navigation items

```tsx
const TAB_ITEMS = [
  { value: "my", label: "My Outfits", route: "/(drawer)/outfits" },
  { value: "favorites", label: "Favorites", route: "/(drawer)/outfits/favorites" },
] as const;
```
