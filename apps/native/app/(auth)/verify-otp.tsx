import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ErrorView, InputOTP, Spinner } from "heroui-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  async function handleVerifyOTP(value: string) {
    setError(null);
    setIsInvalid(false);
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implement actual OTP verification with your backend
      // const result = await authClient.verifyOTP({ code: value });

      // For demo: accept "123456" as valid OTP
      if (value === "123456") {
        setIsLoading(false);
        router.replace("/(auth)/reset-password");
      } else {
        setIsInvalid(true);
        setError("Invalid OTP code. Please try again.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsInvalid(true);
      setError(err?.message || "Failed to verify OTP");
      setIsLoading(false);
    }
  }

  function handleResendCode() {
    setOtp("");
    setError(null);
    setIsInvalid(false);
    // TODO: Implement resend OTP logic
    console.log("Resending OTP code...");
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
          <StyledText className="text-4xl font-bold text-gray-700 mb-1">Verify OTP</StyledText>
          <StyledText className="text-base text-gray-400">
            Enter the 6-digit code sent to your email
          </StyledText>
        </StyledView>

        {/* Error Message */}
        {error && (
          <ErrorView isInvalid={!!error} className="mb-4">
            {error}
          </ErrorView>
        )}

        {/* OTP Input */}
        <StyledView className="mb-8">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            onComplete={handleVerifyOTP}
            isInvalid={isInvalid}
            isDisabled={isLoading}
            inputMode="numeric"
            pattern="[0-9]*"
          >
            <InputOTP.Group className="gap-3 justify-center mb-2">
              <InputOTP.Slot index={0} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
              <InputOTP.Slot index={1} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
              <InputOTP.Slot index={2} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
              <InputOTP.Separator className="mx-2">
                <StyledText className="text-gray-400 text-2xl">-</StyledText>
              </InputOTP.Separator>
              <InputOTP.Slot index={3} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
              <InputOTP.Slot index={4} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
              <InputOTP.Slot index={5} className="w-14 h-14 border-2 border-gray-300 rounded-xl" />
            </InputOTP.Group>
          </InputOTP>
        </StyledView>

        {/* Resend Code Link */}
        <StyledView className="items-center mb-8">
          <StyledText className="text-gray-600 text-sm mb-2">Didn't receive the code?</StyledText>
          <StyledPressable onPress={handleResendCode} className="active:opacity-70">
            <StyledText className="text-[#4A9EFF] text-sm font-medium">Resend Code</StyledText>
          </StyledPressable>
        </StyledView>

        {/* Verify Button */}
        <StyledPressable
          onPress={() => handleVerifyOTP(otp)}
          disabled={isLoading || otp.length !== 6}
          className="bg-[#6B7C6E] rounded-xl py-4 items-center justify-center mb-6 active:opacity-80"
          style={{ opacity: isLoading || otp.length !== 6 ? 0.6 : 1 }}
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <StyledText className="text-white text-base font-medium">Verify Code</StyledText>
          )}
        </StyledPressable>

        {/* Helper Text */}
        <StyledView className="items-center">
          <StyledText className="text-gray-500 text-xs text-center">
            For demo purposes, use code: 123456
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
