import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ErrorView, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

import { authClient } from "@/lib/auth-client";

const StyledIonicons = withUniwind(Ionicons);

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    setError(null);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.replace("/(drawer)");
        },
        onFinished() {
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header with Back Button */}
      <View className="px-6 pt-4 pb-8">
        <Pressable
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center active:opacity-70"
        >
          <StyledIonicons
            name="arrow-back"
            size={24}
            className="text-gray-800"
          />
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {/* Title */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-800 mb-1">Sign UP</Text>
          <Text className="text-base text-gray-500">To Get Start!</Text>
        </View>

        {/* Error Message */}
        {error && (
          <ErrorView isInvalid={!!error} className="mb-4">
            {error}
          </ErrorView>
        )}

        {/* Form Fields */}
        <View className="gap-4 mb-6">
          <TextField>
            <TextField.Input
              value={name}
              onChangeText={setName}
              placeholder="Name"
              autoCapitalize="words"
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
            />
          </TextField>

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
              placeholder="Create Password"
              secureTextEntry
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
            />
          </TextField>

          <TextField>
            <TextField.Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
            />
          </TextField>
        </View>

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSignUp}
          disabled={isLoading}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Text className="text-white text-base font-medium">Sign Up</Text>
          )}
        </Pressable>

        {/* Sign In Link */}
        <View className="flex-row items-center justify-center">
          <Text className="text-gray-700 text-sm">
            Already have an account?{" "}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="active:opacity-70"
          >
            <Text className="text-[#4A9EFF] text-sm font-medium">Sign in</Text>
          </Pressable>
        </View>
      </View>

      {/* Decorative Bottom Shape */}
      <View className="absolute bottom-0 left-0 right-0 h-64 bg-[#6B7C6E] rounded-tl-[200px]" />
    </View>
  );
}
