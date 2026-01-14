# Expo Router - File-Based Routing Guide

A complete guide to understanding file-based routing and navigation in your Outfit Planner app.

## What is Expo Router?

Expo Router is a navigation system for React Native apps that works like Next.js for web apps. Instead of writing complex navigation code, you simply create files and folders, and Expo Router automatically creates routes for you.

**Key Benefits:**

- No manual navigation setup needed
- Every screen automatically gets a URL (works on web and mobile)
- Easy to understand - your folder structure IS your navigation
- Built on React Navigation (so you can use React Navigation docs too)

---

## Your Current App Structure

Here's your app's navigation structure at `c:\Yeasin\personal\outfit-planner\apps\native\app`:

```
app/
├── _layout.tsx              # Root layout (loads first, sets up providers)
├── +not-found.tsx           # 404 error page
├── modal.tsx                # Modal screen (URL: /modal)
└── (drawer)/                # Drawer navigation group
    ├── _layout.tsx          # Drawer configuration
    ├── index.tsx            # Home screen (URL: /)
    └── (tabs)/              # Tab navigation (nested inside drawer)
        ├── _layout.tsx      # Tab configuration
        ├── index.tsx        # First tab (URL: /)
        └── two.tsx          # Second tab (URL: /two)
```

---

## File Naming Rules

### 1. Regular Files (Static Routes)

**Example:** `profile.tsx`, `settings.tsx`

These create fixed routes that match their filename exactly.

```
app/
├── profile.tsx      → URL: /profile
├── settings.tsx     → URL: /settings
└── about.tsx        → URL: /about
```

### 2. Square Brackets `[param]` (Dynamic Routes)

**Example:** `[id].tsx`, `[username].tsx`

These create routes that accept parameters (like user IDs or product names).

```
app/
├── user/
│   └── [id].tsx           → URL: /user/123 or /user/456
├── product/
│   └── [slug].tsx         → URL: /product/shirt or /product/pants
└── post/
    └── [postId].tsx       → URL: /post/abc123
```

**How to use parameters in your component:**

```tsx
// app/user/[id].tsx
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return <Text>User ID: {id}</Text>;
}
```

### 3. Parentheses `(group)` (Route Groups)

**Example:** `(tabs)`, `(drawer)`, `(auth)`

These organize routes without affecting the URL. Perfect for grouping related screens.

```
app/
├── (tabs)/
│   ├── home.tsx           → URL: /home (not /tabs/home)
│   └── explore.tsx        → URL: /explore
└── (auth)/
    ├── login.tsx          → URL: /login (not /auth/login)
    └── signup.tsx         → URL: /signup
```

**Your app uses this pattern:**

- `(drawer)` - Groups drawer screens
- `(tabs)` - Groups tab screens inside the drawer

### 4. `index.tsx` Files (Default Routes)

The `index.tsx` file is the default page for any folder.

```
app/
├── index.tsx              → URL: / (homepage)
├── profile/
│   └── index.tsx          → URL: /profile
└── (tabs)/
    └── index.tsx          → URL: / (default tab)
```

### 5. `_layout.tsx` Files (Navigation Layouts)

These special files define HOW screens in a folder are arranged (stack, tabs, drawer).

```
app/
├── _layout.tsx            → Root layout (providers, global setup)
└── (tabs)/
    ├── _layout.tsx        → Defines tab navigation
    ├── home.tsx
    └── profile.tsx
```

**Example tab layout:**

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
```

### 6. Plus Sign `+` (Special Routes)

Routes with `+` have special meaning:

- `+not-found.tsx` - 404 error page
- `+html.tsx` - Custom HTML wrapper (web only)

---

## Navigation Patterns

### Stack Navigation (Default)

Screens stack on top of each other (like a deck of cards). You can go back to previous screens.

```
app/
├── _layout.tsx            # Stack layout
├── home.tsx               # First screen
└── details.tsx            # Pushes on top of home
```

**Navigate between screens:**

```tsx
import { Link, router } from "expo-router";

// Using Link component
<Link href="/details">Go to Details</Link>;

// Using router (programmatic)
router.push("/details");
router.back();
```

### Tab Navigation

Multiple screens accessible via bottom tabs (like Instagram or Twitter).

```
app/
└── (tabs)/
    ├── _layout.tsx        # Tab configuration
    ├── home.tsx           # Tab 1
    ├── search.tsx         # Tab 2
    └── profile.tsx        # Tab 3
```

**Your app's tab setup** (in `app/(drawer)/(tabs)/_layout.tsx`):

```tsx
<Tabs>
  <Tabs.Screen
    name="index"
    options={{
      title: "Home",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="two"
    options={{
      title: "Explore",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="compass" size={size} color={color} />
      ),
    }}
  />
</Tabs>
```

### Drawer Navigation

Side menu that slides in from the left (like Gmail or Slack).

```
app/
└── (drawer)/
    ├── _layout.tsx        # Drawer configuration
    ├── home.tsx
    └── settings.tsx
```

**Your app's drawer setup** (in `app/(drawer)/_layout.tsx`):

```tsx
<Drawer>
  <Drawer.Screen
    name="index"
    options={{
      headerTitle: "Home",
      drawerLabel: "Home",
      drawerIcon: ({ size, color }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    }}
  />
</Drawer>
```

### Nested Navigation (Your App's Pattern)

Your app uses **Drawer → Tabs** nesting:

```
Drawer (side menu)
  ├── Home screen
  └── Tabs (bottom tabs)
      ├── Tab 1
      └── Tab 2
```

This means:

1. Users can open the drawer from any screen
2. The tabs section has its own bottom tab bar
3. Both navigation types work together

---

## Common Navigation Tasks

### 1. Navigate to a Screen

```tsx
import { router, Link } from "expo-router";

// Using Link (declarative)
<Link href="/profile">View Profile</Link>;

// Using router (imperative)
router.push("/profile");
```

### 2. Navigate with Parameters

```tsx
// Navigate to /user/123
router.push("/user/123");

// Or with object syntax
router.push({
  pathname: "/user/[id]",
  params: { id: "123" },
});

// With query parameters
router.push("/search?q=shirts&color=blue");
```

### 3. Go Back

```tsx
import { router } from "expo-router";

router.back();
```

### 4. Replace Current Screen

```tsx
// Replace instead of push (no back button)
router.replace("/login");
```

### 5. Access URL Parameters

```tsx
import { useLocalSearchParams } from "expo-router";

export default function UserScreen() {
  // For route: /user/[id]?tab=posts
  const { id, tab } = useLocalSearchParams();

  return (
    <View>
      <Text>User ID: {id}</Text>
      <Text>Tab: {tab}</Text>
    </View>
  );
}
```

### 6. Show a Modal

```tsx
// In your app, modal.tsx is configured with presentation: "modal"
router.push("/modal");
```

---

## How to Add New Screens

### Add a Simple Screen

1. Create a new file in the `app` folder:

```tsx
// app/favorites.tsx
import { View, Text } from "react-native";
import { Container } from "@/components/container";

export default function Favorites() {
  return (
    <Container>
      <Text>My Favorites</Text>
    </Container>
  );
}
```

2. Navigate to it: `router.push('/favorites')`

### Add a Dynamic Route

1. Create a file with square brackets:

```tsx
// app/outfit/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { Container } from "@/components/container";

export default function OutfitDetails() {
  const { id } = useLocalSearchParams();

  return (
    <Container>
      <Text>Outfit ID: {id}</Text>
    </Container>
  );
}
```

2. Navigate to it: `router.push('/outfit/123')`

### Add a New Tab

1. Create a new file in `app/(drawer)/(tabs)/`:

```tsx
// app/(drawer)/(tabs)/wardrobe.tsx
import { Container } from "@/components/container";

export default function Wardrobe() {
  return (
    <Container>
      <Text>My Wardrobe</Text>
    </Container>
  );
}
```

2. Register it in `app/(drawer)/(tabs)/_layout.tsx`:

```tsx
<Tabs>
  {/* Existing tabs */}
  <Tabs.Screen
    name="wardrobe"
    options={{
      title: "Wardrobe",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="shirt" size={size} color={color} />
      ),
    }}
  />
</Tabs>
```

### Add a New Drawer Item

1. Create a new file in `app/(drawer)/`:

```tsx
// app/(drawer)/settings.tsx
import { Container } from "@/components/container";

export default function Settings() {
  return (
    <Container>
      <Text>Settings</Text>
    </Container>
  );
}
```

2. Register it in `app/(drawer)/_layout.tsx`:

```tsx
<Drawer>
  {/* Existing screens */}
  <Drawer.Screen
    name="settings"
    options={{
      headerTitle: "Settings",
      drawerLabel: "Settings",
      drawerIcon: ({ size, color }) => (
        <Ionicons name="settings-outline" size={size} color={color} />
      ),
    }}
  />
</Drawer>
```

---

## Best Practices

### 1. Use Route Groups for Organization

```
app/
├── (auth)/              # Authentication screens
│   ├── login.tsx
│   └── signup.tsx
├── (main)/              # Main app screens
│   ├── home.tsx
│   └── profile.tsx
└── (settings)/          # Settings screens
    ├── account.tsx
    └── privacy.tsx
```

### 2. Use the Container Component

Your app has a `Container` component that handles safe areas and scrolling:

```tsx
import { Container } from "@/components/container";

export default function MyScreen() {
  return <Container className="p-6">{/* Your content */}</Container>;
}
```

### 3. Use Path Aliases

Your app is configured with `@/*` alias:

```tsx
// ✅ Good
import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";

// ❌ Avoid
import { Container } from "../../../components/container";
```

### 4. Type Your Parameters

```tsx
import { useLocalSearchParams } from "expo-router";

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Now 'id' is typed as string
}
```

### 5. Keep Non-Route Files Outside `app/`

```
✅ Correct structure:
├── app/              # Only routes
├── components/       # Reusable components
├── lib/              # Utilities
└── contexts/         # Context providers

❌ Wrong:
├── app/
│   ├── home.tsx
│   └── utils.ts      # Don't put utilities here!
```

---

## Common Patterns in Your App

### 1. Theme-Aware Screens

```tsx
import { useThemeColor } from "heroui-native";

export default function MyScreen() {
  const foregroundColor = useThemeColor("foreground");
  const backgroundColor = useThemeColor("background");

  return (
    <View style={{ backgroundColor }}>
      <Text style={{ color: foregroundColor }}>Hello</Text>
    </View>
  );
}
```

### 2. Authenticated Routes

```tsx
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";

export default function ProtectedScreen() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    router.replace("/login");
    return null;
  }

  return <View>{/* Protected content */}</View>;
}
```

### 3. Using HeroUI Components

```tsx
import { Button, Card, TextField } from "heroui-native";

export default function MyScreen() {
  return (
    <Container className="p-6">
      <Card variant="secondary" className="p-4">
        <Card.Title>Welcome</Card.Title>
        <TextField>
          <TextField.Label>Email</TextField.Label>
          <TextField.Input placeholder="email@example.com" />
        </TextField>
        <Button onPress={() => {}}>
          <Button.Label>Submit</Button.Label>
        </Button>
      </Card>
    </Container>
  );
}
```

---

## Troubleshooting

### Screen Not Showing Up?

1. Check the file is in the `app/` directory
2. Make sure it has a default export
3. Restart the dev server: `npm run dev`

### Navigation Not Working?

1. Check the route path matches the file structure
2. Use typed routes for autocomplete (enabled in your app)
3. Check for typos in the path

### Tabs/Drawer Not Appearing?

1. Make sure `_layout.tsx` is configured correctly
2. Check screen names match file names
3. Verify the screen is registered in the layout

---

## Quick Reference

| Task                 | Code                             |
| -------------------- | -------------------------------- |
| Navigate to screen   | `router.push('/screen')`         |
| Go back              | `router.back()`                  |
| Replace screen       | `router.replace('/screen')`      |
| Navigate with params | `router.push('/user/123')`       |
| Get URL params       | `useLocalSearchParams()`         |
| Link component       | `<Link href="/screen">Go</Link>` |
| Check current route  | `usePathname()`                  |
| Navigation state     | `useNavigationState()`           |

---

## Learn More

- [Official Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Navigation Docs](https://reactnavigation.org/) (for styling options)
- [Expo Router Examples](https://github.com/expo/router/tree/main/apps)

---

_This guide is based on your Outfit Planner app structure and Expo Router v6._
