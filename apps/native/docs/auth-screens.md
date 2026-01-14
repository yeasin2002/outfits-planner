# Authentication Screens Documentation

## Overview

The authentication flow consists of two main screens: **Login** and **Sign Up**. Both screens follow the design from Figma with a clean, minimal aesthetic featuring:

- Light background (#FFFFFF)
- Olive/sage green primary color (#6B7C6E)
- Blue accent for links (#4A9EFF)
- Rounded input fields with gray borders
- Decorative curved shape at the bottom

## File Structure

```
app/
├── (auth)/
│   ├── _layout.tsx          # Auth stack layout
│   ├── login.tsx            # Login screen
│   └── signup.tsx           # Sign Up screen
```

## Design Specifications

### Colors

| Element        | Color       | Hex Code             |
| -------------- | ----------- | -------------------- |
| Background     | White       | `#FFFFFF`            |
| Primary Button | Olive Green | `#6B7C6E`            |
| Link Text      | Blue        | `#4A9EFF`            |
| Input Border   | Gray        | `#D1D5DB` (gray-300) |
| Text Primary   | Dark Gray   | `#1F2937` (gray-800) |
| Text Secondary | Medium Gray | `#6B7280` (gray-500) |

### Typography

- **Heading**: 4xl (36px), Bold, Gray-800
- **Subtitle**: Base (16px), Regular, Gray-500
- **Input Text**: Base (16px), Regular
- **Button Text**: Base (16px), Medium, White
- **Link Text**: Small (14px), Medium, Blue

### Spacing

- Screen padding: 24px (px-6)
- Input gap: 16px (gap-4)
- Input padding: 16px (px-4 py-4)
- Button padding: 16px vertical (py-4)
- Section margins: 24px (mb-6)

### Components

- **Back Button**: 48x48px circle, gray-100 background
- **Input Fields**: Rounded-xl (12px), border-gray-300
- **Primary Button**: Rounded-xl (12px), olive green background
- **Decorative Shape**: 256px height, rounded top-left corner (200px radius)

## Screen Details

### Sign Up Screen (`signup.tsx`)

**Route**: `/(auth)/signup`

**Fields**:

1. Name (text input)
2. Email (email input)
3. Create Password (secure input)
4. Confirm Password (secure input)

**Validation**:

- All fields required
- Password minimum 8 characters
- Passwords must match
- Email format validation (handled by Better Auth)

**Actions**:

- Back button → Navigate back
- Sign Up button → Create account and redirect to `/(drawer)`
- "Sign in" link → Navigate to `/(auth)/login`

**Features**:

- Loading state with spinner
- Error message display
- Form validation
- Safe area handling
- Keyboard-aware layout

### Login Screen (`login.tsx`)

**Route**: `/(auth)/login`

**Fields**:

1. Email (email input)
2. Password (secure input)

**Validation**:

- Email and password required
- Email format validation (handled by Better Auth)

**Actions**:

- Back button → Navigate back
- Sign In button → Authenticate and redirect to `/(drawer)`
- "Forgot Password?" link → (To be implemented)
- "Sign up" link → Navigate to `/(auth)/signup`

**Features**:

- Loading state with spinner
- Error message display
- Form validation
- Safe area handling
- Keyboard-aware layout

## Authentication Flow

```
User Opens App
    ↓
/(auth)/login or /(auth)/signup
    ↓
Enter Credentials
    ↓
Validation
    ↓
Better Auth API Call
    ↓
Success → /(drawer) (Main App)
    ↓
Failure → Show Error Message
```

## Integration with Better Auth

Both screens use the `authClient` from `@/lib/auth-client`:

### Sign Up

```typescript
await authClient.signUp.email(
  { name, email, password },
  {
    onError(error) {
      /* Handle error */
    },
    onSuccess() {
      /* Redirect to main app */
    },
    onFinished() {
      /* Stop loading */
    },
  }
);
```

### Sign In

````typescript
await authClient.signIn.email(
  { email, password },
  {
    onError(error) {
      /* Handle error */
    },
    onSuccess() {
      /* Redirect to main app */
    },
    onFinished() {
      /* Stop loading */button styling
- Manual border and padding control

### Why Custom Styling?
- Exact match to Figma design
- Unique brand identity for auth flow
- Different aesthetic from main app
- More control over visual details

## Accessibility

- All inputs have proper placeholders
- Error messages are clearly displayed
- Loading states prevent double submissions
- Touch targets are appropriately sized (48px minimum)
- Safe area insets respected for notched devices

## Future Enhancements

1. **Forgot Password Flow**
   - Password reset screen
   - Email verification
   - Reset confirmation

2. **Social Authentication**
   - Google Sign In
   - Apple Sign In
   - Facebook Sign In

3. **Email Verification**
   - Verification code screen
   - Resend verification email

4. **Onboarding**
   - Welcome screens after signup
   - Profile setup
   - Preferences configuration

5. **Biometric Authentication**
   - Face ID / Touch ID
   - Fingerprint authentication

## Testing Checklist

- [ ] Sign up with valid credentials
- [ ] Sign up with invalid email
- [ ] Sign up with mismatched passwords
- [ ] Sign up with short password
- [ ] Sign up with empty fields
- [ ] Sign in with valid credentials
- [ ] Sign in with invalid credentials
- [ ] Sign in with empty fields
- [ ] Navigation between login and signup
- [ ] Back button functionality
- [ ] Loading states
- [ ] Error message display
- [ ] Keyboard handling
- [ ] Safe area on notched devices
- [ ] Landscape orientation (if supported)

## Code Examples

### Adding a New Auth Screen

1. Create the screen file in `app/(auth)/`:
```typescript
// app/(auth)/forgot-password.tsx
export default function ForgotPasswordScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Screen content */}
    </View>
  );
}
````

2. It will automatically be added to the auth stack

### Customizing Colors

Update the color values in both screens:

```typescript
// Primary button color
className = "bg-[#6B7C6E]";

// Link color
className = "text-[#4A9EFF]";

// Decorative shape color
className = "bg-[#6B7C6E]";
```

### Adding Form Validation

```typescript
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

if (!validateEmail(email)) {
  setError("Please enter a valid email address");
  return;
}
```

## Related Files

- `lib/auth-client.ts` - Better Auth client configuration
- `app/_layout.tsx` - Root layout with auth route
- `app/(drawer)/index.tsx` - Main app entry after authentication
- `.env` - Environment variables (EXPO_PUBLIC_SERVER_URL)

## Design Resources

- **Figma File**: Digital Wardrobe - Outfit Planner
- **Figma Node**: 5-694 (Sign Up Screen)
- **Design System**: See `.kiro/steering/design-system.md`

      },

  }
  );

```

## Navigation

The auth screens use Expo Router's file-based routing:

- `router.push("/(auth)/login")` - Navigate to login
- `router.push("/(auth)/signup")` - Navigate to signup
- `router.replace("/(drawer)")` - Replace with main app (after auth)
- `router.back()` - Go back

## Styling Approach

### Custom Styling

The auth screens use custom styling to match the Figma design exactly, rather than relying on HeroUI Native's default component styles:

- Direct Tailwind classes for precise control
- Custom colors via hex codes
- Pressable components for custom
```
