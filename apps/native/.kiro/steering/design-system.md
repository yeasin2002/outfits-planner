---
inclusion: always
---

# Design System Rules for Figma Integration

This document defines the design system structure and patterns for integrating Figma designs into this Expo/React Native codebase.

## 1. Token Definitions

### Color System

#### Brand Colors (from Figma)

- **Primary**: `#686F60` - Main brand color (headers, primary text)
- **Secondary Base**: `#B48B5F` - Accent color (borders, active states)
- **Secondary Dark**: `#EE9250` - Active indicators (dots, highlights)
- **Base**: `#F7F5ED` - Background surfaces (buttons, cards)
- **Black**: `#000000` - Primary text
- **White**: `#FFFFFF` - Light text and backgrounds
- **Subtext**: `#828282` - Secondary text, placeholders

#### Theme System

- Colors are managed through **HeroUI Native** theme system
- Access colors via `useThemeColor()` hook from `heroui-native`
- Supports light/dark themes via Uniwind
- Common color tokens:
  - `background` - Main background color
  - `foreground` - Primary text color
  - `muted` - Secondary/muted text
  - `success`, `danger`, `warning` - Semantic colors
  - `primary`, `secondary` - Brand colors

```typescript
import { useThemeColor } from "heroui-native";

const foregroundColor = useThemeColor("foreground");
const dangerColor = useThemeColor("danger");
```

### Spacing & Layout

- Use **Tailwind CSS v4** utility classes via Uniwind
- Standard spacing scale: `p-4`, `gap-3`, `mb-6`, etc.
- Safe area handling via `useSafeAreaInsets()` from `react-native-safe-area-context`
- Common spacing from Figma:
  - Horizontal padding: `px-6` (24px)
  - Vertical padding: `py-4` (16px)
  - Gap between items: `gap-4` (16px)
  - Card padding: `p-4` (16px)

### Typography

#### Font Families

- **Caudex Bold** - Headers and titles (16px, line-height: 1.2)
- **Lora Regular** - Body text (14px, 12px, 10px variants, line-height: 1.2)
- **Urbanist SemiBold** - System text (16px, line-height: 1.4, tracking: 0.2px)

#### Usage in Code

```typescript
// Headers
style={{ fontFamily: "Caudex_700Bold", fontSize: 16, lineHeight: 19.2 }}

// Body text
style={{ fontFamily: "Lora_400Regular", fontSize: 14, lineHeight: 16.8 }}

// Small text
style={{ fontFamily: "Lora_400Regular", fontSize: 10, lineHeight: 12 }}
```

#### Tailwind Classes

- Text styling via Tailwind classes: `text-4xl`, `font-bold`, `text-base`, etc.
- Use React Native's `<Text>` component with `className` prop
- Font weights: `font-medium`, `font-bold`

## 2. Component Library

### Location

- Components: `components/` directory
- Screens: `app/` directory (Expo Router file-based routing)
- Shared components: `components/shared/`
- UI primitives: `components/ui/`

### Component Architecture

- **HeroUI Native v1.0.0-beta.9** as primary component library
- Available components:
  - `Button` - Interactive buttons with loading states
  - `TextField` - Form inputs with labels
  - `Tabs` - Tab navigation with indicators
  - `Card` - Content containers
  - `Surface` - Background surfaces with variants
  - `Chip` - Small status indicators
  - `Spinner` - Loading indicators
  - `ErrorView` - Error message display
  - `Dialog` - Modal dialogs
  - `BottomSheet` - Bottom sheet modals

### Custom Components

- `Container` - Screen wrapper (safe area + scroll)
- `OutfitCard` - Outfit display card with favorite toggle
- `WardrobeItemCard` - Wardrobe item card
- `BottomNavigation` - Bottom tab navigation
- `CategoryFilter` - Category filter chips
- `AddItemDialog` - Add item modal

### Component Patterns

```typescript
// Button with loading state
<Button onPress={handleAction} isDisabled={isLoading}>
  {isLoading ? <Spinner size="sm" color="default" /> : <Button.Label>Action</Button.Label>}
</Button>

// TextField with label
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
  />
</TextField>

// Tabs with line variant (Figma style)
<Tabs value={activeTab} onValueChange={setActiveTab} variant="line" animation="disable-all">
  <Tabs.List className="bg-transparent">
    <Tabs.Indicator className="bg-[#B48B5F] h-px" animation={false} />
    <Tabs.Trigger value="tab1" className="px-1.5 py-2.5 bg-transparent">
      {({ isSelected }) => (
        <Tabs.Label className={isSelected ? "text-black" : "text-main-primary"}>
          Tab 1
        </Tabs.Label>
      )}
    </Tabs.Trigger>
  </Tabs.List>
</Tabs>

// Surface with variant
<Surface variant="secondary" className="p-4 rounded-lg">
  {children}
</Surface>

// Card with variant
<Card variant="secondary" className="p-4">
  {children}
</Card>
```

### Container Pattern

- Use `<Container>` component from `@/components/container` for screen wrappers
- Handles safe area insets and scrolling automatically
- Supports Tailwind classes via `className` prop

```typescript
<Container className="p-6">
  {/* Screen content */}
</Container>
```

## 3. Frameworks & Libraries

### Core Stack

- **Expo SDK 54** with Expo Router v6 (file-based routing)
- **React Native 0.81.5**
- **React 19.1.0**
- **TypeScript** (strict mode)

### UI & Styling

- **HeroUI Native** (v1.0.0-beta.9) - Component library
- **Tailwind CSS v4** - Utility-first styling
- **Uniwind** (v1.2.2) - Native Tailwind support for React Native
- **tailwind-variants** & **tailwind-merge** - Style composition

### Animation & Gestures

- **react-native-reanimated** (v4.1.1) - Animations
- **react-native-gesture-handler** (v2.28.0) - Gestures
- **@gorhom/bottom-sheet** (v5) - Bottom sheets

### Build System

- **Metro** bundler (Expo's default)
- **TypeScript** compilation

## 4. Asset Management

### Location

- Assets stored in `assets/images/` directory
- Icons: `assets/images/icon.png`, `assets/images/favicon.png`
- App icons: `android-icon-*.png`, `splash-icon.png`

### Asset References

```typescript
// Static images
<Image source={require("@/assets/images/react-logo.png")} />

// Multiple resolutions supported
// react-logo.png, react-logo@2x.png, react-logo@3x.png

// Remote images (outfits, wardrobe items)
<Image source={{ uri: imageUrl }} />
```

## 5. Icon System

### Primary Icon Library

- **@expo/vector-icons** (v15.0.3)
- Includes Ionicons, MaterialIcons, FontAwesome, etc.

### Icon Usage Pattern

```typescript
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { withUniwind } from "uniwind";

// Styled with Tailwind
const StyledIonicons = withUniwind(Ionicons);
const StyledMaterialIcons = withUniwind(MaterialIcons);

<StyledIonicons name="moon" size={20} className="text-foreground" />
<StyledMaterialIcons name="checkroom" size={24} className="text-white" />
```

### Common Icons

- `home` / `home-outline` - Home navigation
- `checkroom` - Wardrobe/clothing
- `shirt` / `shirt-outline` - Outfits
- `settings` / `settings-outline` - Settings
- `heart` / `heart-outline` - Favorites
- `add` - Add items/outfits
- `moon` / `sunny` - Theme toggle
- `menu` - Drawer menu
- `close` - Close/dismiss actions

### Styled Icon Components

Create reusable styled icon components in `components/ui/styled.tsx`:

```typescript
export const StyledIonicons = withUniwind(Ionicons);
export const StyledMaterialIcons = withUniwind(MaterialIcons);
```

## 6. Styling Approach

### CSS Methodology

- **Utility-first** with Tailwind CSS
- Classes applied via `className` prop (enabled by Uniwind)
- Use `cn()` from `heroui-native` for conditional class merging

```typescript
import { cn } from "heroui-native";

<View className={cn("flex-1 bg-background", isActive && "opacity-50")} />
```

### Theme System

- Light/dark theme support via Uniwind
- Theme managed by `AppThemeProvider` context
- Access theme state via `useAppTheme()` hook

```typescript
import { useAppTheme } from "@/contexts/app-theme-context";

const { isLight, isDark, toggleTheme, setTheme } = useAppTheme();
```

### Responsive Design

- React Native's flexbox layout
- Safe area handling for notches/home indicators
- Platform-specific adjustments via `Platform.OS`

### Global Styles

- Defined in `global.css`:

```css
@import "tailwindcss";
@import "uniwind";
@import "heroui-native/styles";
```

## 7. Project Structure

```
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout (providers)
│   ├── (auth)/                   # Authentication group
│   │   ├── login.tsx             # Login screen
│   │   └── signup.tsx            # Sign up screen
│   └── (drawer)/                 # Drawer navigation group
│       ├── _layout.tsx           # Drawer config with bottom nav
│       ├── index.tsx             # Home screen
│       ├── wardrobe.tsx          # Wardrobe screen
│       └── outfits/              # Outfits section
│           ├── index.tsx         # My Outfits
│           └── favorites.tsx     # Favorites
├── components/                   # Reusable UI components
│   ├── bottom-navigation.tsx    # Bottom nav bar
│   ├── container.tsx            # Screen wrapper
│   ├── outfit-card.tsx          # Outfit card
│   ├── wardrobe-item-card.tsx   # Wardrobe item card
│   └── ui/                      # UI primitives
│       └── styled.tsx           # Styled icons
├── contexts/                    # React context providers
│   └── app-theme-context.tsx   # Theme management
├── lib/                         # Utilities and configs
│   └── auth-client.ts          # Better Auth client
├── assets/images/              # Static assets
└── global.css                  # Tailwind entry point
```

### Path Aliases

- `@/*` maps to project root
- Example: `import { Container } from "@/components/container"`

### Provider Hierarchy (Root Layout)

1. `GestureHandlerRootView` - Gesture support
2. `KeyboardProvider` - Keyboard handling
3. `AppThemeProvider` - Theme management
4. `HeroUINativeProvider` - HeroUI components

## Figma Integration Guidelines

### When Converting Figma Designs to Code

1. **Use Exact Figma Colors**
   - Primary: `#686F60`
   - Secondary Base: `#B48B5F`
   - Secondary Dark: `#EE9250`
   - Base: `#F7F5ED`
   - Subtext: `#828282`
   - Apply via `className` or `style` prop

2. **Use HeroUI Components**
   - Use `<Button>`, `<TextField>`, `<Tabs>`, `<Card>`, `<Surface>` instead of raw `<View>` + Tailwind
   - Maintain visual parity but use semantic components
   - Customize with `className` and `style` props to match Figma

3. **Typography from Figma**
   - Map Figma text styles to font families
   - Use `style` prop for font family, size, and line height
   - Common patterns:

     ```tsx
     // Header
     style={{ fontFamily: "Caudex_700Bold", fontSize: 16, lineHeight: 19.2 }}

     // Body
     style={{ fontFamily: "Lora_400Regular", fontSize: 14, lineHeight: 16.8 }}
     ```

4. **Spacing & Layout from Figma**
   - Keep Tailwind spacing classes: `p-4`, `gap-3`, `mb-6`
   - Use flexbox: `flex-1`, `flex-row`, `items-center`, `justify-between`
   - Match exact pixel values from Figma

5. **Icons**
   - Replace Figma icons with `@expo/vector-icons`
   - Use `withUniwind()` wrapper for Tailwind styling
   - Match icon sizes from Figma (16px, 20px, 24px, 36px)

6. **Interactive States**
   - Use `isDisabled`, `isLoading` props on HeroUI components
   - Add `active:opacity-70` for press feedback on custom Pressables
   - Consider haptic feedback for iOS: `Haptics.impactAsync()`

7. **Animations**
   - Use `react-native-reanimated` for complex animations
   - Disable animations when matching static Figma designs: `animation="disable-all"`
   - Built-in animations: `ZoomIn`, `FadeOut`, etc.

8. **Safe Areas**
   - Wrap screens in `<Container>` for automatic safe area handling
   - Or use `useSafeAreaInsets()` for custom layouts

### Tabs Component (Figma Style)

Match Figma tab designs with HeroUI Tabs:

```tsx
<Tabs
  value={activeTab}
  onValueChange={setActiveTab}
  variant="line"
  animation="disable-all"
>
  <Tabs.List className="bg-transparent">
    <Tabs.Indicator className="bg-[#B48B5F] h-px" animation={false} />
    {TAB_ITEMS.map((tab) => (
      <Tabs.Trigger
        key={tab.value}
        value={tab.value}
        className="px-1.5 py-2.5 bg-transparent"
      >
        {({ isSelected }) => (
          <Tabs.Label
            className={isSelected ? "text-black" : "text-main-primary"}
            style={{ fontFamily: "Lora_400Regular", fontSize: 14, lineHeight: 16.8 }}
          >
            {tab.label}
          </Tabs.Label>
        )}
      </Tabs.Trigger>
    ))}
  </Tabs.List>
</Tabs>
```

### Code Connect Mapping

- Map Figma components to codebase components using the `add_code_connect_map` tool
- Component locations: `components/*.tsx` or `app/**/*.tsx`
- Use framework label: `React` or `React Native`

### Example Conversion

**Figma Output (Generic React + Tailwind):**

```tsx
<div className="flex flex-col gap-4 p-6">
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Submit
  </button>
</div>
```

**Converted to Project Style:**

```tsx
<Container className="p-6">
  <View className="gap-4">
    <Button onPress={handleSubmit}>
      <Button.Label>Submit</Button.Label>
    </Button>
  </View>
</Container>
```

## 8. Data-Driven Patterns

### Navigation Items

Use arrays of objects for navigation configuration:

```tsx
const TAB_ITEMS = [
  { value: "my", label: "My Outfits", route: "/(drawer)/outfits" },
  { value: "favorites", label: "Favorites", route: "/(drawer)/outfits/favorites" },
  { value: "ai-pick", label: "Ai Pick", route: "/(drawer)/outfits/ai-pick" },
] as const;

// Render
{TAB_ITEMS.map((tab) => (
  <Tabs.Trigger key={tab.value} value={tab.value} onPress={() => router.push(tab.route)}>
    {/* ... */}
  </Tabs.Trigger>
))}
```

### Benefits

- Single source of truth
- Easy to add/remove items
- Type-safe with `as const`
- Reduces code duplication
