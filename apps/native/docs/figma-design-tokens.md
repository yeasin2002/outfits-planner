# Figma Design Tokens - Digital Wardrobe

This document contains the design tokens extracted from the Figma design for the Digital Wardrobe - Outfit Planner app.

## Color Palette

### Primary Colors

```typescript
const colors = {
  // Primary brand color (olive/sage green)
  primary: "#6B7C6E",

  // Accent color (blue for links)
  accent: "#4A9EFF",

  // Background
  background: "#FFFFFF",

  // Text colors
  textPrimary: "#1F2937", // gray-800
  textSecondary: "#6B7280", // gray-500
  textMuted: "#9CA3AF", // gray-400

  // Border colors
  borderDefault: "#D1D5DB", // gray-300
  borderLight: "#E5E7EB", // gray-200

  // Surface colors
  surfaceLight: "#F3F4F6", // gray-100
  surfaceWhite: "#FFFFFF",
};
```

### Usage Guidelines

- **Primary (#6B7C6E)**: Main action buttons, decorative elements, brand identity
- **Accent (#4A9EFF)**: Links, secondary actions, highlights
- **Background (#FFFFFF)**: Screen backgrounds, card backgrounds
- **Text Primary (#1F2937)**: Headings, important text
- **Text Secondary (#6B7280)**: Subtitles, descriptions
- **Border Default (#D1D5DB)**: Input borders, dividers

## Typography

### Font Sizes

```typescript
const fontSize = {
  xs: 12, // Extra small text
  sm: 14, // Small text, links
  base: 16, // Body text, inputs
  lg: 18, // Large body text
  xl: 20, // Small headings
  "2xl": 24, // Medium headings
  "3xl": 30, // Large headings
  "4xl": 36, // Extra large headings (Sign UP)
};
```

### Font Weights

```typescript
const fontWeight = {
  regular: "400", // Normal text
  medium: "500", // Buttons, links
  semibold: "600", // Subheadings
  bold: "700", // Main headings
};
```

### Typography Scale

| Element     | Size         | Weight  | Color    | Usage                            |
| ----------- | ------------ | ------- | -------- | -------------------------------- |
| Page Title  | 4xl (36px)   | Bold    | Gray-800 | "Sign UP", "Sign In"             |
| Subtitle    | Base (16px)  | Regular | Gray-500 | "To Get Start!", "Welcome Back!" |
| Body Text   | Base (16px)  | Regular | Gray-700 | General content                  |
| Input Text  | Base (16px)  | Regular | Gray-800 | Form inputs                      |
| Button Text | Base (16px)  | Medium  | White    | Primary buttons                  |
| Link Text   | Small (14px) | Medium  | Blue     | "Sign in", "Forgot Password?"    |
| Caption     | Small (14px) | Regular | Gray-500 | Helper text                      |

## Spacing

### Spacing Scale

```typescript
const spacing = {
  1: 4, // 0.25rem
  2: 8, // 0.5rem
  3: 12, // 0.75rem
  4: 16, // 1rem
  5: 20, // 1.25rem
  6: 24, // 1.5rem
  8: 32, // 2rem
  10: 40, // 2.5rem
  12: 48, // 3rem
  16: 64, // 4rem
};
```

### Common Spacing Patterns

- **Screen Padding**: 24px (spacing-6)
- **Section Margin**: 24px (spacing-6)
- **Input Gap**: 16px (spacing-4)
- **Input Padding**: 16px horizontal, 16px vertical
- **Button Padding**: 16px vertical
- **Small Gap**: 8px (spacing-2)
- **Large Gap**: 32px (spacing-8)

## Border Radius

```typescript
const borderRadius = {
  sm: 4, // Small elements
  md: 8, // Medium elements
  lg: 12, // Large elements (inputs, buttons)
  xl: 16, // Extra large
  "2xl": 24, // Very large
  full: 9999, // Circles (back button)
};
```

### Usage

- **Inputs**: 12px (rounded-xl)
- **Buttons**: 12px (rounded-xl)
- **Back Button**: Full circle (rounded-full)
- **Decorative Shape**: 200px top-left corner

## Component Specifications

### Back Button

```typescript
{
  width: 48,
  height: 48,
  borderRadius: 'full',
  backgroundColor: '#F3F4F6', // gray-100
  iconSize: 24,
  iconColor: '#1F2937', // gray-800
}
```

### Text Input

```typescript
{
  height: 56, // Auto with padding
  paddingHorizontal: 16,
  paddingVertical: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#D1D5DB', // gray-300
  backgroundColor: '#FFFFFF',
  fontSize: 16,
  color: '#1F2937', // gray-800
  placeholderColor: '#9CA3AF', // gray-400
}
```

### Primary Button

```typescript
{
  height: 56, // Auto with padding
  paddingVertical: 16,
  borderRadius: 12,
  backgroundColor: '#6B7C6E',
  fontSize: 16,
  fontWeight: '500',
  color: '#FFFFFF',
}
```

### Decorative Shape

```typescript
{
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 256,
  backgroundColor: '#6B7C6E',
  borderTopLeftRadius: 200,
}
```

## Icons

### Icon Sizes

```typescript
const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};
```

### Common Icons (from @expo/vector-icons)

- **Back Arrow**: `arrow-back` (Ionicons, 24px)
- **Eye**: `eye` / `eye-off` (Ionicons, 20px) - Password visibility
- **Checkmark**: `checkmark-circle` (Ionicons, 24px) - Success states
- **Alert**: `alert-circle` (Ionicons, 24px) - Error states

## Shadows & Elevation

The design uses minimal shadows for a clean, flat aesthetic:

```typescript
const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
};
```

## Animation & Transitions

### Timing

```typescript
const duration = {
  fast: 150, // Quick transitions
  normal: 250, // Standard transitions
  slow: 350, // Slow transitions
};
```

### Common Animations

- **Button Press**: Opacity 0.8, duration 150ms
- **Screen Transition**: Slide from right, duration 250ms
- **Loading Spinner**: Continuous rotation
- **Error Shake**: Horizontal shake, duration 350ms

## Accessibility

### Minimum Touch Targets

- **Buttons**: 48x48px minimum
- **Input Fields**: 48px height minimum
- **Links**: 44x44px touch area

### Color Contrast Ratios

- **Primary Button Text**: White on #6B7C6E (4.5:1 ✓)
- **Body Text**: #1F2937 on #FFFFFF (16:1 ✓)
- **Link Text**: #4A9EFF on #FFFFFF (3.2:1 ⚠️ - Consider darker shade for better accessibility)

## Responsive Breakpoints

For web/tablet support:

```typescript
const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};
```

## Implementation in Code

### Using Tailwind Classes

```tsx
// Primary button
<Pressable className="bg-[#6B7C6E] rounded-xl py-4 px-6">
  <Text className="text-white text-base font-medium">Sign Up</Text>
</Pressable>

// Input field
<TextInput
  className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
  placeholderTextColor="#9CA3AF"
/>

// Page title
<Text className="text-4xl font-bold text-gray-800">Sign UP</Text>

// Subtitle
<Text className="text-base text-gray-500">To Get Start!</Text>

// Link
<Text className="text-[#4A9EFF] text-sm font-medium">Sign in</Text>
```

### Using Theme Tokens (Future Enhancement)

Consider creating a theme configuration file:

```typescript
// theme/tokens.ts
export const tokens = {
  colors: {
    primary: "#6B7C6E",
    accent: "#4A9EFF",
    // ... rest of colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // ... rest of tokens
};
```

## Figma Resources

- **File**: Digital Wardrobe - Outfit Planner
- **File Key**: UTL1LKGNRVGIDXgDgWELxL
- **Sign Up Screen Node**: 5-694
- **Design URL**: https://www.figma.com/design/UTL1LKGNRVGIDXgDgWELxL/

## Notes

- The design follows a clean, minimal aesthetic
- Olive green (#6B7C6E) is the primary brand color
- Rounded corners (12px) are used consistently
- The decorative curved shape adds visual interest
- White space is used generously for clarity
- The design is mobile-first but can scale to tablet/desktop

```

```
