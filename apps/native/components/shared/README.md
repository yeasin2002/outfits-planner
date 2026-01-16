# Shared Components

Reusable components that can be used across the entire application.

## FormInput

A reusable form input component that integrates react-hook-form with HeroUI Native components.

### Features

- ✅ Integrated with react-hook-form Controller
- ✅ HeroUI Native Label with required indicator
- ✅ HeroUI Native TextField with validation states
- ✅ Automatic error message display
- ✅ Full TypeScript support
- ✅ Customizable styling

### Usage

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/shared";

// Define your schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View>
      <FormInput
        control={control}
        name="name"
        label="Full Name"
        placeholder="Enter your name"
        isRequired
      />
      <Button onPress={handleSubmit(onSubmit)}>
        <Button.Label>Submit</Button.Label>
      </Button>
    </View>
  );
}
```

### Props

| Prop              | Type                               | Default         | Description                                  |
| ----------------- | ---------------------------------- | --------------- | -------------------------------------------- |
| `control`         | `Control<T>`                       | Required        | react-hook-form control object               |
| `name`            | `Path<T>`                          | Required        | Field name from your form schema             |
| `label`           | `string`                           | Required        | Label text displayed above input             |
| `placeholder`     | `string`                           | `undefined`     | Placeholder text for the input               |
| `isRequired`      | `boolean`                          | `false`         | Shows asterisk indicator on label            |
| `secureTextEntry` | `boolean`                          | `false`         | Hides text input (for passwords)             |
| `keyboardType`    | `TextInputProps["keyboardType"]`   | `"default"`     | Keyboard type (email-address, numeric, etc.) |
| `autoCapitalize`  | `TextInputProps["autoCapitalize"]` | `"sentences"`   | Auto-capitalization behavior                 |
| `className`       | `string`                           | `undefined`     | Additional classes for wrapper View          |
| `inputClassName`  | `string`                           | Default styling | Custom classes for the input field           |

### Examples

#### Email Input

```tsx
<FormInput
  control={control}
  name="email"
  label="Email Address"
  placeholder="you@example.com"
  isRequired
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

#### Password Input

```tsx
<FormInput
  control={control}
  name="password"
  label="Password"
  placeholder="Enter your password"
  isRequired
  secureTextEntry
/>
```

#### Phone Number Input

```tsx
<FormInput
  control={control}
  name="phone"
  label="Phone Number"
  placeholder="+1 (555) 000-0000"
  keyboardType="phone-pad"
/>
```

#### Custom Styling

```tsx
<FormInput
  control={control}
  name="username"
  label="Username"
  placeholder="Choose a username"
  isRequired
  autoCapitalize="none"
  className="mb-4"
  inputClassName="bg-gray-50 border-2 border-blue-500 rounded-lg px-4 py-3"
/>
```

### Integration with Zod

The component works seamlessly with Zod validation:

```tsx
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => Number(val) >= 18, "Must be 18 or older"),
});
```

Error messages from Zod will automatically display below the input field.
