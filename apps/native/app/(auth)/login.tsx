import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ErrorView, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

import { authClient } from "@/lib/auth-client";
import React from "react";

const StyledIonicons = withUniwind(Ionicons);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess() {
          setEmail("");
          setPassword("");
          router.replace("/(drawer)");
        },
        onFinished() {
          setIsLoading(false);
        },
      }
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
          <StyledIonicons
            name="arrow-back"
            size={24}
            className="text-gray-800"
          />
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
          <TextField>
            <TextField.Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
            />
          </TextField>

          <TextField>
            <TextField.Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
            />
          </TextField>
        </StyledView>

        {/* Forgot Password Link */}
        <StyledView className="items-end mb-6">
          <StyledPressable onPress={() => {}} className="active:opacity-70">
            <StyledText className="text-[#4A9EFF] text-sm">Forgot Password?</StyledText>
          </StyledPressable>
        </StyledView>

        {/* Sign In Button */}
        <StyledPressable
          onPress={handleLogin}
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
