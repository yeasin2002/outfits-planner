import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);
const StyledMaterialIcons = withUniwind(MaterialIcons);

// Category filter items
const CATEGORIES = [
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "outwear", label: "Outwear" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
] as const;

// Sample wardrobe items for display
const SAMPLE_ITEMS = [
  { id: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 2, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400" },
  { id: 3, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
];

export default function OutfitBuilderScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [outfitName, setOutfitName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tops");

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center gap-3.5 px-5.75"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Pressable
          className="bg-white rounded-full items-center justify-center active:opacity-70"
          style={{
            width: 32,
            height: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={() => router.back()}
        >
          <StyledIonicons name="chevron-back" size={18} className="text-black" />
        </Pressable>
        <Text
          className="text-main-primary text-[16px]"
          style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
        >
          Outfit Builder
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 23, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Section */}
        <View className="gap-4 mb-6">
          {/* Name Input */}
          <View
            className="border-[#828282] border-[0.5px] rounded-[5px] px-4 py-3"
            style={{ height: 42 }}
          >
            <TextInput
              value={outfitName}
              onChangeText={setOutfitName}
              placeholder="Name your outfit...."
              placeholderTextColor="#828282"
              className="text-[#000000] text-[12px]"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 14.4,
                padding: 0,
              }}
            />
          </View>

          {/* Select Items Area */}
          <View
            className="bg-[#F7F5ED] border-[#828282] border-[0.5px] rounded-[5px] items-center justify-center gap-2"
            style={{ height: 119, paddingHorizontal: 140, paddingVertical: 17 }}
          >
            <View
              className="bg-[#FAE0BD] rounded-full items-center justify-center"
              style={{ width: 32, height: 32 }}
            >
              <StyledIonicons name="add" size={16} className="text-[#B48B5F]" />
            </View>
            <Text
              className="text-[#B48B5F] text-[12px] text-center"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 14.4,
              }}
            >
              Select items below to build your outfit
            </Text>
          </View>
        </View>

        {/* AI Suggestions Card */}
        <Pressable
          className="border-[#828282] border-[0.5px] rounded-[5px] px-6 py-2.75 mb-10 active:opacity-70"
          style={{
            height: 68,
            backgroundColor: "#F7F5ED",
          }}
          onPress={() => {
            // Handle AI suggestions
          }}
        >
          <View className="flex-row items-center gap-1.5">
            <StyledMaterialIcons name="auto-awesome" size={24} className="text-[#B48B5F]" />
            <View className="gap-1.25" style={{ width: 183 }}>
              <Text
                className="text-[#363636] text-[16px]"
                style={{
                  fontFamily: "Lora_500Medium",
                  lineHeight: 19.2,
                }}
              >
                Get it suggestions
              </Text>
              <Text
                className="text-[#828282] text-[12px]"
                style={{
                  fontFamily: "Lora_400Regular",
                  lineHeight: 14.4,
                }}
              >
                Let ai complete your outfit
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-10"
          contentContainerStyle={{ gap: 8 }}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              className={`px-3 py-1 rounded-[25px] active:opacity-70 ${
                selectedCategory === category.id ? "bg-[#686F60]" : "bg-[#F3F3F3]"
              }`}
              style={{ height: 30 }}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                className={`text-[14px] ${selectedCategory === category.id ? "text-white" : "text-[#828282]"}`}
                style={{
                  fontFamily: "Lora_400Regular",
                  lineHeight: 16.8,
                }}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Wardrobe Items Grid */}
        <View className="items-center gap-10.5 mb-6">
          <View className="flex-row justify-between w-full" style={{ maxWidth: 345 }}>
            {SAMPLE_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                className="rounded-lg overflow-hidden active:opacity-70"
                style={{ width: 109, height: 160 }}
              >
                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
              </Pressable>
            ))}
          </View>

          {/* Save Button */}
          <Pressable
            className="bg-[#686F60] rounded-[5px] items-center justify-center active:opacity-70"
            style={{ width: 209, height: 42 }}
            onPress={() => {
              // Handle save outfit
            }}
          >
            <Text
              className="text-white text-[14px]"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 16.8,
              }}
            >
              Save Outfit
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
