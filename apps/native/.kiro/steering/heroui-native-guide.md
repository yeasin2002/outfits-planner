# HeroUI Native Component Guide

This guide defines how to use HeroUI Native components throughout the Outfit Planner application.

## Overview

HeroUI Native is the primary UI component library for this project. It provides beautiful, accessible components built on Tailwind CSS v4 via Uniwind, with smooth animations and full TypeScript support.

**Version:** v1.0.0-beta.12 (latest)

## Core Principles

1. **Always use HeroUI Native components** instead of raw React Native components when available
2. **Compound component pattern** - Most components use subcomponents (e.g., `Button.Label`, `TextField.Input`)
3. **Tailwind styling** - Apply styles via `className` prop using Tailwind utilities
4. **Theme-aware** - Use `useThemeColor()` hook for dynamic colors
5. **Accessibility built-in** - All components follow mobile accessibility best practices

---

## Available Components

### Buttons

#### Button

Interactive component with loading states, variants, and sizes.

```tsx
import { Button, Spinner } from "heroui-native";

// Basic button
<Button onPress={handlePress}>
  <Button.Label>Click Me</Button.Label>
</Button>

// With loading state
<Button onPress={handleSubmit} isDisabled={isLoading}>
  {isLoading ? (
    <Spinner size="sm" color="default" />
  ) : (
    <Button.Label>Submit</Button.Label>
  )}
</Button>

// Variants: solid (default), bordered, light, flat, ghost
<Button variant="bordered">
  <Button.Label>Bordered</Button.Label>
</Button>

// Sizes: sm, md (default), lg
<Button size="lg">
  <Button.Label>Large Button</Button.Label>
</Button>

// With icon
<Button>
  <Ionicons name="add" size={20} />
  <Button.Label>Add Item</Button.Label>
</Button>
```

**Props:**

- `variant`: "solid" | "bordered" | "light" | "flat" | "ghost"
- `size`: "sm" | "md" | "lg"
- `isDisabled`: boolean
- `onPress`: () => void
- `className`: string (Tailwind classes)

---

### Forms

#### TextField

Form input with label, description, and error states.

```tsx
import { TextField, Description, ErrorView } from "heroui-native";

// Basic text field
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
    keyboardType="email-address"
    autoCapitalize="none"
  />
</TextField>

// With description
<TextField>
  <TextField.Label>Password</TextField.Label>
  <TextField.Input
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />
  <Description>Must be at least 8 characters</Description>
</TextField>

// With error state
<TextField>
  <TextField.Label>Username</TextField.Label>
  <TextField.Input
    value={username}
    onChangeText={setUsername}
  />
  <ErrorView isInvalid={!!error}>
    {error}
  </ErrorView>
</TextField>

// Multiline (textarea)
<TextField>
  <TextField.Label>Bio</TextField.Label>
  <TextField.Input
    value={bio}
    onChangeText={setBio}
    multiline
    numberOfLines={4}
  />
</TextField>
```

**TextField.Input Props:**

- All React Native `TextInput` props
- `className`: string (Tailwind classes)
- `multiline`: boolean
- `secureTextEntry`: boolean

#### Label

Accessible label for form fields with required indicator.

```tsx
import { Label } from "heroui-native";

// Basic label
<Label>Email Address</Label>

// Required field (shows asterisk)
<Label isRequired>Password</Label>

// With validation state
<Label isInvalid={hasError}>Username</Label>
```

#### Description

Helper text for form fields.

```tsx
import { Description } from "heroui-native";

<Description>We'll never share your email with anyone else.</Description>;
```

#### InputOTP

One-time password input with individual character slots.

```tsx
import { InputOTP, Label, Description } from "heroui-native";

<>
  <Label>Verify account</Label>
  <InputOTP length={6} value={code} onValueChange={(code) => console.log(code)}>
    <InputOTP.Group>
      <InputOTP.Slot index={0} />
      <InputOTP.Slot index={1} />
      <InputOTP.Slot index={2} />
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      <InputOTP.Slot index={3} />
      <InputOTP.Slot index={4} />
      <InputOTP.Slot index={5} />
    </InputOTP.Group>
  </InputOTP>
  <Description>We've sent a code to your email</Description>
</>;
```

**Props:**

- `length`: number (total slots)
- `value`: string
- `onValueChange`: (value: string) => void
- `pattern`: "digits" | "characters" | RegExp

#### Checkbox

Checkbox with label support.

```tsx
import { Checkbox } from "heroui-native";

<Checkbox value="terms" onChange={setAccepted}>
  I agree to the terms and conditions
</Checkbox>

// Variants: solid (default), bordered, flat
<Checkbox variant="bordered">Option</Checkbox>
```

#### Radio

Radio button for single selection.

```tsx
import { Radio } from "heroui-native";

<Radio value="option1">Option 1</Radio>
<Radio value="option2">Option 2</Radio>
```

#### Select

Dropdown selection component.

```tsx
import { Select } from "heroui-native";

<Select
  value={selected}
  onValueChange={setSelected}
  placeholder="Select an option"
>
  <Select.Item value="1">Option 1</Select.Item>
  <Select.Item value="2">Option 2</Select.Item>
  <Select.Item value="3">Option 3</Select.Item>
</Select>;
```

---

### Layout

#### Surface

Background surface with variants for elevation.

```tsx
import { Surface } from "heroui-native";

// Variants: primary, secondary, tertiary
<Surface variant="secondary" className="p-4 rounded-lg">
  <Text className="text-foreground">Content</Text>
</Surface>;
```

**Props:**

- `variant`: "primary" | "secondary" | "tertiary"
- `className`: string (Tailwind classes)

#### Card

Content container with header, body, and footer.

```tsx
import { Card } from "heroui-native";

<Card variant="secondary" className="p-4">
  <Card.Header>
    <Text className="text-lg font-bold">Card Title</Text>
  </Card.Header>
  <Card.Body>
    <Text>Card content goes here</Text>
  </Card.Body>
  <Card.Footer>
    <Button size="sm">
      <Button.Label>Action</Button.Label>
    </Button>
  </Card.Footer>
</Card>;
```

**Props:**

- `variant`: "primary" | "secondary" | "tertiary"
- `className`: string (Tailwind classes)

#### Container (Custom Component)

Screen wrapper with safe area and scroll support.

```tsx
import { Container } from "@/components/container";

<Container className="p-6">{/* Screen content */}</Container>;
```

---

### Overlays

#### Dialog

Modal dialog with swipe-to-dismiss.

```tsx
import { Dialog, Button } from "heroui-native";

<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>
    <Button>
      <Button.Label>Open Dialog</Button.Label>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
    </Dialog.Header>
    <Dialog.Body>
      <Text>Are you sure you want to continue?</Text>
    </Dialog.Body>
    <Dialog.Footer>
      <Button onPress={() => setIsOpen(false)}>
        <Button.Label>Cancel</Button.Label>
      </Button>
      <Button variant="solid" onPress={handleConfirm}>
        <Button.Label>Confirm</Button.Label>
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>;
```

**Props:**

- `isOpen`: boolean (controlled state)
- `onOpenChange`: (isOpen: boolean) => void

#### BottomSheet

Sheet that slides up from bottom with snap points.

```tsx
import { BottomSheet, Button } from "heroui-native";

<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  snapPoints={["50%", "90%"]}
>
  <BottomSheet.Trigger>
    <Button>
      <Button.Label>Open Sheet</Button.Label>
    </Button>
  </BottomSheet.Trigger>
  <BottomSheet.Content>
    <BottomSheet.Header>
      <BottomSheet.Title>Sheet Title</BottomSheet.Title>
    </BottomSheet.Header>
    <BottomSheet.Body>
      <Text>Sheet content</Text>
    </BottomSheet.Body>
  </BottomSheet.Content>
</BottomSheet>;
```

**Props:**

- `snapPoints`: string[] (e.g., ["50%", "90%"])
- `isOpen`: boolean
- `onOpenChange`: (isOpen: boolean) => void

#### Popover

Floating content anchored to a trigger.

```tsx
import { Popover, Button } from "heroui-native";

<Popover>
  <Popover.Trigger>
    <Button>
      <Button.Label>Open Popover</Button.Label>
    </Button>
  </Popover.Trigger>
  <Popover.Content>
    <Text>Popover content</Text>
  </Popover.Content>
</Popover>;
```

---

### Feedback

#### Spinner

Loading indicator.

```tsx
import { Spinner } from "heroui-native";

// Sizes: sm, md (default), lg
<Spinner size="sm" color="default" />
<Spinner size="lg" />
```

**Props:**

- `size`: "sm" | "md" | "lg"
- `color`: "default" | "primary" | "secondary" | "success" | "warning" | "danger"

#### ErrorView

Error message display with validation state.

```tsx
import { ErrorView } from "heroui-native";

<ErrorView isInvalid={!!error} className="mb-3">
  {error}
</ErrorView>;
```

**Props:**

- `isInvalid`: boolean
- `className`: string

#### Chip

Small status indicator or tag.

```tsx
import { Chip } from "heroui-native";

<Chip>Active</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="danger">Error</Chip>
```

**Props:**

- `variant`: "default" | "primary" | "secondary" | "success" | "warning" | "danger"

---

### Navigation

#### Tabs

Tab navigation component.

```tsx
import { Tabs } from "heroui-native";

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">
    <Text>Tab 1 content</Text>
  </Tabs.Panel>
  <Tabs.Panel value="tab2">
    <Text>Tab 2 content</Text>
  </Tabs.Panel>
</Tabs>;
```

---

## Styling Patterns

### Using Tailwind Classes

```tsx
// Spacing
<Button className="mt-4 mb-2">
  <Button.Label>Spaced Button</Button.Label>
</Button>

// Flexbox
<View className="flex-row items-center gap-2">
  <Ionicons name="star" size={20} />
  <Text>Rating</Text>
</View>

// Colors (use theme colors)
<Text className="text-foreground">Primary text</Text>
<Text className="text-muted">Secondary text</Text>
```

### Using Theme Colors

```tsx
import { useThemeColor } from "heroui-native";

const foregroundColor = useThemeColor("foreground");
const dangerColor = useThemeColor("danger");
const successColor = useThemeColor("success");

<Ionicons name="checkmark" size={24} color={successColor} />;
```

**Available theme colors:**

- `background` - Main background
- `foreground` - Primary text
- `muted` - Secondary text
- `primary` - Brand primary
- `secondary` - Brand secondary
- `success` - Success state
- `danger` - Error/danger state
- `warning` - Warning state
- `accent` - Accent color
- `accent-foreground` - Accent text

### Conditional Styling

```tsx
import { cn } from "heroui-native";

<View
  className={cn(
    "p-4 rounded-lg",
    isActive && "bg-primary",
    isDisabled && "opacity-50",
  )}
/>;
```

---

## Common Patterns

### Form with Validation

```tsx
import { Button, TextField, ErrorView, Spinner } from "heroui-native";
import { useState } from "react";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Submit logic
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="gap-3">
      <ErrorView isInvalid={!!error} className="mb-3">
        {error}
      </ErrorView>

      <TextField>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </TextField>

      <TextField>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </TextField>

      <Button onPress={handleSubmit} isDisabled={isLoading} className="mt-2">
        {isLoading ? (
          <Spinner size="sm" color="default" />
        ) : (
          <Button.Label>Sign In</Button.Label>
        )}
      </Button>
    </View>
  );
}
```

### Card with Actions

```tsx
import { Card, Button, Chip } from "heroui-native";

<Card variant="secondary" className="p-4">
  <Card.Header className="flex-row items-center justify-between">
    <Text className="text-lg font-bold">Outfit Name</Text>
    <Chip variant="success">Active</Chip>
  </Card.Header>
  <Card.Body>
    <Text className="text-muted">Description of the outfit</Text>
  </Card.Body>
  <Card.Footer className="flex-row gap-2">
    <Button size="sm" variant="bordered">
      <Button.Label>Edit</Button.Label>
    </Button>
    <Button size="sm" variant="solid">
      <Button.Label>View</Button.Label>
    </Button>
  </Card.Footer>
</Card>;
```

### Screen with Container

```tsx
import { Container } from "@/components/container";
import { Card, Button } from "heroui-native";

export default function MyScreen() {
  return (
    <Container className="p-6">
      <Text className="text-3xl font-bold mb-4">Screen Title</Text>

      <Card variant="secondary" className="p-4 mb-4">
        <Card.Body>
          <Text>Card content</Text>
        </Card.Body>
      </Card>

      <Button onPress={handleAction}>
        <Button.Label>Action</Button.Label>
      </Button>
    </Container>
  );
}
```

---

## Best Practices

### 1. Always Use Compound Components

```tsx
// ✅ Correct
<Button>
  <Button.Label>Click Me</Button.Label>
</Button>

// ❌ Wrong
<Button label="Click Me" />
```

### 2. Use Theme Colors for Dynamic Values

```tsx
// ✅ Correct - adapts to theme
const iconColor = useThemeColor("foreground");
<Ionicons name="star" color={iconColor} />

// ❌ Wrong - hardcoded color
<Ionicons name="star" color="#000000" />
```

### 3. Prefer HeroUI Components Over Raw Components

```tsx
// ✅ Correct
<Button onPress={handlePress}>
  <Button.Label>Submit</Button.Label>
</Button>

// ❌ Wrong
<Pressable onPress={handlePress}>
  <Text>Submit</Text>
</Pressable>
```

### 4. Use Container for Screens

```tsx
// ✅ Correct - handles safe area and scrolling
<Container className="p-6">
  {/* content */}
</Container>

// ❌ Wrong - manual safe area handling
<SafeAreaView>
  <ScrollView>
    {/* content */}
  </ScrollView>
</SafeAreaView>
```

### 5. Handle Loading States

```tsx
// ✅ Correct - shows loading feedback
<Button onPress={handleSubmit} isDisabled={isLoading}>
  {isLoading ? <Spinner size="sm" /> : <Button.Label>Submit</Button.Label>}
</Button>

// ❌ Wrong - no loading feedback
<Button onPress={handleSubmit}>
  <Button.Label>Submit</Button.Label>
</Button>
```

---

## Migration from Raw Components

### Button Migration

```tsx
// Before (raw Pressable)
<Pressable
  onPress={handlePress}
  className="bg-blue-500 px-4 py-2 rounded"
>
  <Text className="text-white">Click Me</Text>
</Pressable>

// After (HeroUI Button)
<Button onPress={handlePress}>
  <Button.Label>Click Me</Button.Label>
</Button>
```

### Input Migration

```tsx
// Before (raw TextInput)
<View>
  <Text>Email</Text>
  <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
  />
</View>

// After (HeroUI TextField)
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
  />
</TextField>
```

---

## Resources

- **Official Docs:** https://v3.heroui.com/docs/native/getting-started
- **Components:** https://v3.heroui.com/docs/native/components
- **GitHub:** https://github.com/heroui-inc/heroui-native
- **Current Version:** Beta 12 (January 2026)

---

## Quick Reference

| Component     | Use Case             | Key Props                            |
| ------------- | -------------------- | ------------------------------------ |
| `Button`      | Actions, submissions | `variant`, `size`, `isDisabled`      |
| `TextField`   | Text input           | `value`, `onChangeText`, `multiline` |
| `Card`        | Content containers   | `variant`, compound structure        |
| `Surface`     | Background surfaces  | `variant`                            |
| `Dialog`      | Modal dialogs        | `isOpen`, `onOpenChange`             |
| `BottomSheet` | Bottom sheets        | `snapPoints`, `isOpen`               |
| `Spinner`     | Loading states       | `size`, `color`                      |
| `Chip`        | Status indicators    | `variant`                            |
| `ErrorView`   | Error messages       | `isInvalid`                          |
| `Container`   | Screen wrapper       | Custom component                     |
