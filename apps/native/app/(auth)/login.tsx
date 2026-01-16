import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ErrorView, Label, Spinner, TextField } from "heroui-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

const StyledIonicons = withUniwind(Ionicons);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);

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
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
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
    <StyledView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
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
          <StyledText className="text-4xl font-bold text-gray-800 mb-1">Sign In</StyledText>
          <StyledText className="text-base text-gray-500">Welcome Back!</StyledText>
        </StyledView>

        {/* Error Message */}
        {error && (
          <ErrorView isInvalid={!!error} className="mb-4">
            {error}
          </ErrorView>
        )}

        {/* Form Fields */}
        <StyledView className="gap-4 mb-6">
          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledView>
                <Label isRequired isInvalid={!!errors.email} className="mb-2">
                  <Label.Text>Email</Label.Text>
                </Label>
                <TextField isInvalid={!!errors.email}>
                  <TextField.Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
                  />
                </TextField>
                {errors.email && (
                  <ErrorView isInvalid className="mt-1">
                    {errors.email.message}
                  </ErrorView>
                )}
              </StyledView>
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledView>
                <Label isRequired isInvalid={!!errors.password} className="mb-2">
                  <Label.Text>Password</Label.Text>
                </Label>
                <TextField isInvalid={!!errors.password}>
                  <TextField.Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your password"
                    secureTextEntry
                    className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
                  />
                </TextField>
                {errors.password && (
                  <ErrorView isInvalid className="mt-1">
                    {errors.password.message}
                  </ErrorView>
                )}
              </StyledView>
            )}
          />
        </StyledView>

        {/* Forgot Password Link */}
        <StyledView className="items-end mb-6">
          <StyledPressable onPress={() => {}} className="active:opacity-70">
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
          <StyledText className="text-gray-700 text-sm">Don't have an account? </StyledText>
          <StyledPressable
            onPress={() => router.push("/(auth)/signup")}
            className="active:opacity-70"
          >
            <StyledText className="text-[#4A9EFF] text-sm font-medium">Sign up</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledView>

      {/* Decorative Bottom Shape */}
      <StyledView className="absolute bottom-0 left-0 right-0 h-64 bg-[#6B7C6E] rounded-tl-[200px]" />
    </StyledView>
  );
}
