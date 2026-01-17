import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "heroui-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

type PlanType = "monthly" | "yearly";

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("yearly");

  const handleBuyNow = () => {
    // TODO: Implement payment flow
    console.log("Buy now:", selectedPlan);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center gap-3">
            <Pressable
              className="bg-white p-2 rounded-full shadow-sm active:opacity-70"
              onPress={() => router.back()}
            >
              <StyledIonicons name="arrow-back" size={18} className="text-main-primary" />
            </Pressable>
            <Text className="text-[16px] font-bold" style={{ color: "#686F60" }}>
              Premium Plan
            </Text>
          </View>
        </View>

        {/* Crown Icon & Title */}
        <View className="items-center px-6 mb-8">
          <View className="w-[100px] h-[100px] items-center justify-center mb-4">
            <StyledIonicons name="color-wand" size={80} style={{ color: "#D4A574" }} />
          </View>
          <Text className="text-[20px] font-medium mb-1.5" style={{ color: "#000000" }}>
            Free Plan
          </Text>
          <Text className="text-[16px]" style={{ color: "#B48B5F" }}>
            Unlock the complete experience
          </Text>
        </View>

        {/* Pricing Cards */}
        <View className="px-6 mb-8">
          <View className="flex-row gap-3">
            {/* Monthly Plan */}
            <Pressable
              className="flex-1 h-[106px] rounded-md items-center justify-center border active:opacity-70"
              style={{
                backgroundColor: selectedPlan === "monthly" ? "#FAE0BD" : "#F5F5F5",
                borderColor: selectedPlan === "monthly" ? "#686F60" : "#E5E7EB",
              }}
              onPress={() => setSelectedPlan("monthly")}
            >
              <Text className="text-[18px] mb-3" style={{ color: "#212121" }}>
                Monthly
              </Text>
              <Text className="text-[24px] font-bold" style={{ color: "#000000" }}>
                $4.99
              </Text>
            </Pressable>

            {/* Yearly Plan */}
            <View className="flex-1 relative">
              <Pressable
                className="h-[106px] rounded-md items-center justify-center border active:opacity-70"
                style={{
                  backgroundColor: selectedPlan === "yearly" ? "#FAE0BD" : "#F5F5F5",
                  borderColor: selectedPlan === "yearly" ? "#686F60" : "#E5E7EB",
                }}
                onPress={() => setSelectedPlan("yearly")}
              >
                <Text className="text-[18px] mb-3" style={{ color: "#212121" }}>
                  Yearly
                </Text>
                <Text className="text-[24px] font-bold" style={{ color: "#000000" }}>
                  $29.99
                </Text>
              </Pressable>
              {/* Save Badge */}
              <View
                className="absolute -top-2 right-2 px-3.5 py-1 rounded-full"
                style={{ backgroundColor: "#686F60" }}
              >
                <Text className="text-[10px] text-white">Save 40%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="px-6 mb-6">
          <View className="h-px bg-[#E5E7EB]" />
        </View>

        {/* Premium Features */}
        <View className="px-6 mb-8">
          <Text className="text-[18px] font-medium mb-3" style={{ color: "#000000" }}>
            Premium Features
          </Text>

          <View className="gap-5">
            <FeatureItem text="Up to 20 wardrobe items" />
            <FeatureItem text="5 outfit creations" />
            <FeatureItem text="Basic style suggestions" />
            <FeatureItem text="Community access" />
          </View>
        </View>

        {/* Buy Now Button */}
        <View className="px-6 pb-24">
          <Button
            onPress={handleBuyNow}
            className="h-[40px] rounded-md"
            style={{ backgroundColor: "#686F60" }}
          >
            <Button.Label className="text-[13px] text-white">Buy Now</Button.Label>
          </Button>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#686F60] flex-row items-center justify-around py-4 px-6">
        <Pressable
          className="items-center active:opacity-70"
          onPress={() => router.push("/(drawer)")}
        >
          <StyledIonicons name="home-outline" size={24} className="text-white mb-1" />
          <Text className="text-xs text-white opacity-70">Home</Text>
        </Pressable>
        <Pressable
          className="items-center active:opacity-70"
          onPress={() => router.push("/(drawer)/wardrobe")}
        >
          <StyledIonicons name="shirt-outline" size={24} className="text-white mb-1" />
          <Text className="text-xs text-white opacity-70">Wardrobe</Text>
        </Pressable>
        <Pressable className="items-center active:opacity-70">
          <StyledIonicons name="images-outline" size={24} className="text-white mb-1" />
          <Text className="text-xs text-white opacity-70">Outfits</Text>
        </Pressable>
        <Pressable className="items-center active:opacity-70">
          <View className="items-center">
            <Text className="text-base font-bold text-white mb-1">Settings</Text>
            <View className="w-3 h-3 bg-[#EE9250] rounded-full" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <StyledIonicons name="checkmark-circle" size={24} style={{ color: "#4CAF50" }} />
      <Text className="text-[16px]" style={{ color: "#2B2B2B" }}>
        {text}
      </Text>
    </View>
  );
}
