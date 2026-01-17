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
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setError(null);
    setIsLoading(true);

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign in");
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
          <StyledText className="text-4xl font-bold text-gray-700 mb-1">Sign In</StyledText>
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
            label="Password"
            placeholder="Enter your password"
            isRequired
            secureTextEntry
          />
        </StyledView>

        {/* Forgot Password Link */}
        <StyledView className="items-end mb-6">
          <StyledPressable
            onPress={() => router.push("/(auth)/forgot-password")}
            className="active:opacity-70"
          >
            <StyledText className="text-[#4A9EFF] text-sm">Forgot Password?</StyledText>
          </StyledPressable>
        </StyledView>

        {/* Sign In Button */}
        <StyledPressable
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <StyledText className="text-white text-base font-medium">Sign In</StyledText>
          )}
        </StyledPressable>

        {/* Sign Up Link */}
        <StyledView className="flex-row items-center justify-center">
          <StyledText className="text-gray-800 text-sm">{`Don't`} have an account? </StyledText>
          <StyledPressable
            onPress={() => router.push("/(auth)/signup")}
            className="active:opacity-70"
          >
            <StyledText className="text-[#4A9EFF] text-sm font-medium">Sign Up</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
