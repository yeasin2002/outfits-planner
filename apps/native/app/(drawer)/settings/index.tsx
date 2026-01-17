import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

// Style preferences data
const STYLE_PREFERENCES = [
  { id: "casual", label: "Casual", icon: "👗", selected: true },
  { id: "formal", label: "Formal", icon: "👔", selected: true },
  { id: "streetwear", label: "Street Wear", icon: "🧥", selected: false },
  { id: "bohemian", label: "Bohemian", icon: "🌸", selected: false },
  { id: "sporty", label: "Sporty", icon: "⚽", selected: true },
  { id: "minimalist", label: "Minimalist", icon: "⚪", selected: false },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [stylePreferences, setStylePreferences] = useState(STYLE_PREFERENCES);
  const router = useRouter();

  const toggleStylePreference = (id: string) => {
    setStylePreferences((prev) =>
      prev.map((pref) => (pref.id === id ? { ...pref, selected: !pref.selected } : pref)),
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6" style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}>
          <Text
            className="text-[#686F60] text-[16px]"
            style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
          >
            Settings
          </Text>
        </View>

        {/* Profile Card */}
        <View className="mx-6 mb-3 bg-[#F7F5ED] rounded-lg p-4">
          {/* Profile Info */}
          <View className="flex-row gap-4 mb-5">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=47" }}
              className="w-[66px] h-[66px] rounded"
            />
            <View className="flex-1 gap-3">
              <View className="gap-0.5">
                <Text
                  className="text-[#686F60] text-[16px]"
                  style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
                >
                  Hafsa Binte Kalam
                </Text>
                <Text
                  className="text-[#B48B5F] text-[10px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 12 }}
                >
                  hello.hafsabinte@gmail.com
                </Text>
              </View>
              <Pressable
                className="flex-row items-center gap-2 border border-[#686F60] rounded-md px-2.5 py-1.5 self-start active:opacity-70"
                onPress={() => {
                  // Handle edit profile
                }}
              >
                <Text
                  className="text-[#686F60] text-[10px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 12 }}
                >
                  Edit Profile
                </Text>
                <StyledIonicons name="create-outline" size={16} className="text-[#686F60]" />
              </Pressable>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row items-center justify-center gap-4">
            <View className="items-center">
              <Text
                className="text-black text-[20px]"
                style={{ fontFamily: "Caudex_700Bold", lineHeight: 24 }}
              >
                24
              </Text>
              <Text
                className="text-[#B48B5F] text-[12px]"
                style={{ fontFamily: "Lora_400Regular", lineHeight: 14.4 }}
              >
                Items
              </Text>
            </View>

            <View className="w-px h-[30px] bg-[#B48B5F]" />

            <View className="items-center">
              <Text
                className="text-black text-[20px]"
                style={{ fontFamily: "Caudex_700Bold", lineHeight: 24 }}
              >
                10
              </Text>
              <Text
                className="text-[#B48B5F] text-[12px]"
                style={{ fontFamily: "Lora_400Regular", lineHeight: 14.4 }}
              >
                Outfits
              </Text>
            </View>

            <View className="w-px h-[30px] bg-[#B48B5F]" />

            <View className="items-center">
              <Text
                className="text-black text-[20px]"
                style={{ fontFamily: "Caudex_700Bold", lineHeight: 24 }}
              >
                02
              </Text>
              <Text
                className="text-[#B48B5F] text-[12px]"
                style={{ fontFamily: "Lora_400Regular", lineHeight: 14.4 }}
              >
                Outfits
              </Text>
            </View>
          </View>
        </View>

        {/* Premium Card */}
        <View className="mx-6 mb-5 bg-[#FFECD3] border border-[#686F60] rounded-md p-4">
          <View className="flex-row items-start gap-2 mb-2">
            <StyledIonicons name={"crown-outline" as any} size={27} className="text-[#686F60]" />
            <View className="flex-1">
              <Text
                className="text-[#212121] text-[20px] mb-1"
                style={{ fontFamily: "Lora_500Medium", lineHeight: 24 }}
              >
                Free Plan
              </Text>
              <Text
                className="text-[#4D4D4D] text-[10px]"
                style={{ fontFamily: "Lora_400Regular", lineHeight: 12 }}
              >
                Upgrade premium to unlock all features.
              </Text>
            </View>
          </View>
          <Pressable
            className="bg-[#686F60] rounded-full py-2 items-center active:opacity-80"
            onPress={() => {
              router.push("/settings/premium");
            }}
          >
            <Text
              className="text-white text-[13px]"
              style={{ fontFamily: "Lora_400Regular", lineHeight: 15.6 }}
            >
              Go Premium
            </Text>
          </Pressable>
        </View>

        {/* Style Preference */}
        <View className="mx-6 mb-5">
          <View className="flex-row items-center gap-1.5 mb-5">
            <StyledIonicons name="shirt-outline" size={20} className="text-[#686F60]" />
            <Text
              className="text-[#686F60] text-[16px]"
              style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
            >
              Style Preference
            </Text>
          </View>

          <View className="gap-3">
            <View className="flex-row flex-wrap gap-2">
              {stylePreferences.slice(0, 3).map((pref) => (
                <Pressable
                  key={pref.id}
                  className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                    pref.selected ? "bg-[rgba(238,146,80,0.7)]" : "bg-[#F7F5ED]"
                  }`}
                  onPress={() => toggleStylePreference(pref.id)}
                >
                  <Text className="text-[14px]">{pref.icon}</Text>
                  <Text
                    className={`text-[12px] ${pref.selected ? "text-white" : "text-[#828282]"}`}
                    style={{ fontFamily: "Lora_400Regular", lineHeight: 14.4 }}
                  >
                    {pref.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className="flex-row flex-wrap gap-2">
              {stylePreferences.slice(3).map((pref) => (
                <Pressable
                  key={pref.id}
                  className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                    pref.selected ? "bg-[rgba(238,146,80,0.7)]" : "bg-[#F7F5ED]"
                  }`}
                  onPress={() => toggleStylePreference(pref.id)}
                >
                  <Text className="text-[14px]">{pref.icon}</Text>
                  <Text
                    className={`text-[12px] ${pref.selected ? "text-white" : "text-[#828282]"}`}
                    style={{ fontFamily: "Lora_400Regular", lineHeight: 14.4 }}
                  >
                    {pref.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="mx-6">
          <Text
            className="text-[#686F60] text-[16px] mb-5"
            style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
          >
            Account
          </Text>

          <View className="gap-2">
            {/* Privacy & Security */}
            <Pressable
              className="flex-row items-center justify-between px-3 py-1.5 active:opacity-70"
              onPress={() => {
                // Handle navigation
              }}
            >
              <View className="flex-row items-center gap-1.5">
                <StyledIonicons
                  name="shield-checkmark-outline"
                  size={16}
                  className="text-[#686F60]"
                />
                <Text
                  className="text-black text-[14px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
                >
                  Privacy & Security
                </Text>
              </View>
              <StyledIonicons name="chevron-forward" size={16} className="text-[#686F60]" />
            </Pressable>

            {/* Change Password */}
            <Pressable
              className="flex-row items-center justify-between px-3 py-1.5 active:opacity-70"
              onPress={() => {
                // Handle navigation
              }}
            >
              <View className="flex-row items-center gap-1.5">
                <StyledIonicons name="key-outline" size={16} className="text-[#686F60]" />
                <Text
                  className="text-black text-[14px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
                >
                  Change Password
                </Text>
              </View>
              <StyledIonicons name="chevron-forward" size={16} className="text-[#686F60]" />
            </Pressable>

            {/* Location & Services */}
            <View className="flex-row items-center justify-between px-3 py-1.5">
              <View className="flex-row items-center gap-1.5">
                <StyledIonicons name="location-outline" size={16} className="text-[#686F60]" />
                <Text
                  className="text-black text-[14px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
                >
                  Location & Services
                </Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: "#D1D5DB", true: "#EE9250" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Help & Support */}
            <Pressable
              className="flex-row items-center justify-between px-3 py-1.5 active:opacity-70"
              onPress={() => {
                // Handle navigation
              }}
            >
              <View className="flex-row items-center gap-1.5">
                <StyledIonicons name="help-circle-outline" size={16} className="text-[#686F60]" />
                <Text
                  className="text-black text-[14px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
                >
                  Help & Support
                </Text>
              </View>
              <StyledIonicons name="chevron-forward" size={16} className="text-[#686F60]" />
            </Pressable>

            {/* Delete Account */}
            <Pressable
              className="flex-row items-center justify-between px-3 py-1.5 active:opacity-70"
              onPress={() => {
                // Handle delete account
              }}
            >
              <View className="flex-row items-center gap-1.5">
                <StyledIonicons name="trash-outline" size={16} className="text-[#EE9250]" />
                <Text
                  className="text-[#EE9250] text-[14px]"
                  style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
                >
                  Delete Account
                </Text>
              </View>
              <StyledIonicons name="chevron-forward" size={16} className="text-[#686F60]" />
            </Pressable>
          </View>

          {/* Logout Button */}
          <Pressable
            className="border border-red-500 rounded mt-11 py-3 flex-row items-center justify-center gap-1.5 active:opacity-70"
            onPress={() => {
              // Handle logout
            }}
          >
            <StyledIonicons name="log-out-outline" size={20} className="text-red-500" />
            <Text
              className="text-red-500 text-[14px]"
              style={{ fontFamily: "Lora_400Regular", lineHeight: 16.8 }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
