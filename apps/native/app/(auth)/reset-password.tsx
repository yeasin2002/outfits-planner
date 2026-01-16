import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ErrorView, Spinner } from "heroui-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { withUniwind } from "uniwind";
import { z } from "zod";

import { FormInput } from "@/components/shared/form-input";
import { authClient } from "@/lib/auth-client";

const StyledIonicons = withUniwind(Ionicons);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);

// Zod validation schema
const resetPasswordSchema = z
  .object({
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

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setError(null);
    setIsLoading(true);

    await authClient.resetPassword(
      {
        newPassword: data.password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to reset password");
          setIsLoading(false);
        },
        onSuccess() {
          reset();
          // Navigate to login page after successful reset
          router.replace("/(auth)/login");
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
          <StyledText className="text-4xl font-bold text-gray-700 mb-1">Reset Password</StyledText>
          <StyledText className="text-base text-gray-400">Create a new one</StyledText>
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
            name="password"
            label="Create Password"
            placeholder="Create your new password"
            isRequired
            secureTextEntry
          />

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            isRequired
            secureTextEntry
          />
        </StyledView>

        {/* Save Password Button */}
        <StyledPressable
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <StyledText className="text-white text-base font-medium">Save Password</StyledText>
          )}
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
