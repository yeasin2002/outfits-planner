import { OutfitCard } from "@/components/outfit-card";
import { outfits } from "@/data/outfits.data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Tabs } from "heroui-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

// Tab configuration
const TAB_ITEMS = [
  { value: "my", label: "My Outfits", route: "/(drawer)/outfits" },
  {
    value: "favorites",
    label: "Favorites",
    route: "/(drawer)/outfits/favorites",
  },
  { value: "ai-pick", label: "Ai Pick", route: "/(drawer)/outfits/ai-pick" },
] as const;

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("favorites");
  const [outfitList, setOutfitList] = useState(outfits);

  // Filter only favorite outfits
  const favoriteOutfits = outfitList.filter((outfit) => outfit.isFavorite);

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
          {TAB_ITEMS.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-1.5 py-2.5 bg-transparent"
              onPress={() => router.push(tab.route as any)}
            >
              {({ isSelected }) => (
                <Tabs.Label
                  className={isSelected ? "text-black" : "text-[#686F60]"}
                  style={{
                    fontFamily: "Lora_400Regular",
                    fontSize: 14,
                    lineHeight: 16.8,
                  }}
                >
                  {tab.label}
                </Tabs.Label>
              )}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {favoriteOutfits.length > 0 ? (
          <View className="flex-row flex-wrap gap-4">
            {favoriteOutfits.map((outfit) => (
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
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <StyledIonicons name="heart-outline" size={48} className="text-[#828282] mb-4" />
            <Text
              className="text-[#828282] text-[14px] text-center"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 16.8,
              }}
            >
              No favorite outfits yet
            </Text>
            <Text
              className="text-[#B48B5F] text-[12px] text-center mt-2"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 14.4,
              }}
            >
              Tap the heart icon to save your favorites
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
