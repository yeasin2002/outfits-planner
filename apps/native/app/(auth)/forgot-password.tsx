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

const StyledIonicons = withUniwind(Ionicons);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);

// Zod validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      // Simulate sending reset code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setIsLoading(false);

      // TODO: Implement with Better Auth when available
      // await authClient.forgotPassword({ email: data.email });

      // Optionally navigate to verify OTP after delay
      setTimeout(() => {
        router.push("/(auth)/verify-otp");
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Failed to send reset code");
      setIsLoading(false);
    }
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
          <StyledText className="text-4xl font-bold text-gray-700 mb-1">Forget Password</StyledText>
          <StyledText className="text-base text-gray-400">
            Enter your email to reset password
          </StyledText>
        </StyledView>

        {/* Error Message */}
        {error && (
          <ErrorView isInvalid={!!error} className="mb-4">
            {error}
          </ErrorView>
        )}

        {/* Success Message */}
        {success && (
          <StyledView className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <StyledText className="text-green-700 text-sm">
              Reset code sent! Check your email for instructions.
            </StyledText>
          </StyledView>
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
        </StyledView>

        {/* Send Code Button */}
        <StyledPressable
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <StyledText className="text-white text-base font-medium">Send Code</StyledText>
          )}
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
