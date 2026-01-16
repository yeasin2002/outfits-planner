import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ErrorView, Spinner } from "heroui-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/components/shared/form-input";
import { StyledIonicons, StyledPressable, StyledText, StyledView } from "@/components/ui/styled";
import { authClient } from "@/lib/auth-client";

// Zod validation schema
const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupFormData) {
    setError(null);
    setIsLoading(true);

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          reset();
          router.replace("/(drawer)");
        },
        onFinished() {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <StyledView>
      {/* Header with Back Button */}
      <StyledView className="px-6 pt-4 pb-8">
        <StyledPressable
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center active:opacity-70"
        >
          <StyledIonicons name="arrow-back" size={24} className="text-gray-800" />
        </StyledPressable>
      </StyledView>

      {/* Content */}
      <StyledView className="flex-1 px-6">
        {/* Title */}
        <StyledView className="mb-8">
          <StyledText className="text-4xl font-bold text-gray-700 mb-1">Sign UP</StyledText>
          <StyledText className="text-base text-gray-400">To Get Start!</StyledText>
        </StyledView>

        {/* Error Message */}
        {error && (
          <ErrorView isInvalid={!!error} className="mb-4">
            {error}
          </ErrorView>
        )}

        {/* Form Fields */}
        <StyledView className="gap-4 mb-6">
          <FormInput
            control={control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            isRequired
            autoCapitalize="words"
          />

          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            isRequired
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            control={control}
            name="password"
            label="Create Password"
            placeholder="Create your password"
            isRequired
            secureTextEntry
          />

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            isRequired
            secureTextEntry
          />
        </StyledView>

        {/* Sign Up Button */}
        <StyledPressable
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <StyledText className="text-white text-base font-medium">Sign Up</StyledText>
          )}
        </StyledPressable>

        {/* Sign In Link */}
        <StyledView className="flex-row items-center justify-center">
          <StyledText className="text-gray-800 text-sm">Already have an account? </StyledText>
          <StyledPressable
            onPress={() => router.push("/(auth)/login")}
            className="active:opacity-70"
          >
            <StyledText className="text-[#4A9EFF] text-sm font-medium">Sign in</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
