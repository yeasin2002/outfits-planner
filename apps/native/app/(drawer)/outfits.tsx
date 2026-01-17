import { OutfitCard } from "@/components/outfit-card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Tabs } from "heroui-native";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

// Sample outfit data
const outfits = [
  {
    id: 1,
    title: "Casual Friday",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Casual Friday",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Casual Friday",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Casual Friday",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
    isFavorite: false,
  },
];

export default function OutfitsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my");
  const [outfitList, setOutfitList] = useState(outfits);

  const toggleFavorite = (id: number) => {
    setOutfitList((prev) =>
      prev.map((outfit) =>
        outfit.id === id ? { ...outfit, isFavorite: !outfit.isFavorite } : outfit,
      ),
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-6"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Text
          className="text-[#686F60] text-[16px]"
          style={{ fontFamily: "Caudex_700Bold", lineHeight: 19.2 }}
        >
          Outfits
        </Text>
        <Pressable
          className="bg-[#F7F5ED] p-2 rounded-md active:opacity-70"
          onPress={() => {
            // Handle add outfit
          }}
        >
          <StyledIonicons name="add" size={16} className="text-[#686F60]" />
        </Pressable>
      </View>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        variant="line"
        className="px-6 mt-4"
        animation="disable-all"
      >
        <Tabs.List className="bg-transparent">
          <Tabs.Indicator className="bg-[#B48B5F] h-px" animation={false} />
          <Tabs.Trigger value="my" className="px-1.5 py-2.5 bg-transparent">
            {({ isSelected }) => (
              <Tabs.Label
                className={isSelected ? "text-black" : "text-[#686F60]"}
                style={{
                  fontFamily: "Lora_400Regular",
                  fontSize: 14,
                  lineHeight: 16.8,
                }}
              >
                My Outfits
              </Tabs.Label>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="favourite" className="px-1.5 py-2.5 bg-transparent">
            {({ isSelected }) => (
              <Tabs.Label
                className={isSelected ? "text-black" : "text-[#686F60]"}
                style={{
                  fontFamily: "Lora_400Regular",
                  fontSize: 14,
                  lineHeight: 16.8,
                }}
              >
                Favourite
              </Tabs.Label>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="ai" className="px-1.5 py-2.5 bg-transparent">
            {({ isSelected }) => (
              <Tabs.Label
                className={isSelected ? "text-black" : "text-[#686F60]"}
                style={{
                  fontFamily: "Lora_400Regular",
                  fontSize: 14,
                  lineHeight: 16.8,
                }}
              >
                Ai Pick
              </Tabs.Label>
            )}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Outfit Grid */}
        <View className="flex-row flex-wrap gap-4">
          {outfitList.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              id={outfit.id}
              title={outfit.title}
              category={outfit.category}
              image={outfit.image}
              isFavorite={outfit.isFavorite}
              onPress={() => {
                // Handle outfit press
              }}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </View>

        {/* Create New Outfit Card */}
        <Pressable
          className="mt-8 mb-24 border-[0.5px] border-dashed border-[#828282] rounded-lg py-4 px-8 items-center active:opacity-70"
          style={{ minHeight: 119 }}
          onPress={() => {
            // Handle create new outfit
          }}
        >
          <View className="bg-[#F7F5ED] w-10 h-10 rounded-full items-center justify-center mb-2">
            <StyledIonicons name="add" size={20} className="text-[#686F60]" />
          </View>
          <Text
            className="text-[#828282] text-[12px] mb-1"
            style={{
              fontFamily: "Lora_400Regular",
              lineHeight: 14.4,
            }}
          >
            Create New Outfit
          </Text>
          <Text
            className="text-[#B48B5F] text-[10px]"
            style={{
              fontFamily: "Lora_400Regular",
              lineHeight: 12,
            }}
          >
            Mix & match items from your wardrobe
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
