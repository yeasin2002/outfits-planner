# Project Structure

```
├── app/                    # Expo Router file-based routes
│   ├── _layout.tsx         # Root layout (providers, gesture handler)
│   ├── +not-found.tsx      # 404 screen
│   ├── modal.tsx           # Modal screen (presentation: modal)
│   └── (drawer)/           # Drawer navigation group
│       ├── _layout.tsx     # Drawer layout config
│       ├── index.tsx       # Home screen (auth UI)
│       └── (tabs)/         # Tab navigation group (nested in drawer)
│           ├── _layout.tsx # Tab layout config
│           ├── index.tsx   # Tab one
│           └── two.tsx     # Tab two
├── components/             # Reusable UI components
├── contexts/               # React context providers
├── lib/                    # Utilities and client configs
├── assets/images/          # Static images and icons
├── global.css              # Tailwind CSS entry point
└── .env                    # Environment variables
```

## Conventions

### Routing

- Route groups use parentheses: `(drawer)`, `(tabs)`
- Layout files: `_layout.tsx` in each route directory
- Screen files: `index.tsx` or named files like `two.tsx`

### Components

- Functional components with named exports
- Use `Container` component for screen wrappers (handles safe area + scroll)
- HeroUI Native components for UI elements (Button, Card, Surface, TextField)

### Styling

- Tailwind classes via `className` prop (enabled by Uniwind)
- Use `cn()` from heroui-native for conditional class merging
- Theme colors accessed via `useThemeColor()` hook

### Path Aliases

- `@/*` maps to project root (e.g., `@/components/container`)

### Provider Hierarchy (root layout)

1. GestureHandlerRootView
2. KeyboardProvider
3. AppThemeProvider
4. HeroUINativeProvider
