import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

export default function Home() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-1">
            <View>
              <Text className="text-sm" style={{ color: "#A0A0A0" }}>
                Good Morning
              </Text>
              <Text className="text-2xl font-bold" style={{ color: "#686F60" }}>
                Fashion Lover
              </Text>
            </View>
            <View className="flex-row items-center gap-1 bg-[#F5F5F5] px-3 py-2 rounded-full">
              <StyledIonicons name="cloud-outline" size={16} className="text-[#686F60]" />
              <Text className="text-sm" style={{ color: "#686F60" }}>
                20°C
              </Text>
            </View>
          </View>
        </View>

        {/* Today's Pick Card */}
        <View className="px-6 mb-6">
          <View className="bg-[#F5F5F0] rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <StyledIonicons name="sparkles" size={20} style={{ color: "#D4A574" }} />
              <Text className="text-lg font-semibold" style={{ color: "#686F60" }}>
                Today's Pick
              </Text>
            </View>
            <Text className="text-sm leading-5" style={{ color: "#8B8B8B" }}>
              Perfect weather for layering! Try a light sweater with your favorite jacket.
            </Text>
          </View>
        </View>

        {/* Outfit Ideas */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-lg font-semibold" style={{ color: "#686F60" }}>
              Outfit Ideas
            </Text>
            <Pressable className="flex-row items-center gap-1 active:opacity-70">
              <Text className="text-sm" style={{ color: "#D4A574" }}>
                See All
              </Text>
              <StyledIonicons name="chevron-forward" size={16} style={{ color: "#D4A574" }} />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            <View className="flex-row gap-3">
              <OutfitCard
                image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"
                label="Casual Friday"
                category="Formal"
              />
              <OutfitCard
                image="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=400"
                label="Casual Friday"
                category="Formal"
              />
              <OutfitCard
                image="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400"
                label="Casual Friday"
                category="Casual"
              />
            </View>
          </ScrollView>
        </View>

        {/* Recent Items */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-lg font-semibold" style={{ color: "#686F60" }}>
              Recent Items
            </Text>
            <Pressable className="flex-row items-center gap-1 active:opacity-70">
              <Text className="text-sm" style={{ color: "#D4A574" }}>
                View All
              </Text>
              <StyledIonicons name="chevron-forward" size={16} style={{ color: "#D4A574" }} />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            <View className="flex-row gap-4">
              <ItemCard
                image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
                title="T-shirt"
                category="Tops"
              />
              <ItemCard
                image="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"
                title="Formal Pant"
                category="Outerwear"
              />
              <ItemCard
                image="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
                title="Sun Glass"
                category="Accessories"
              />
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-24">
          <Text className="text-lg font-semibold mb-4" style={{ color: "#686F60" }}>
            Quick Actions
          </Text>
          <View className="flex-row gap-4">
            <Pressable className="flex-1 bg-[#D4E5D4] rounded-2xl p-4 active:opacity-70">
              <StyledIonicons name="sparkles-outline" size={28} style={{ color: "#8B9B8B" }} />
              <Text className="text-lg font-semibold mt-3 mb-1" style={{ color: "#686F60" }}>
                Today's Pick
              </Text>
              <Text className="text-sm" style={{ color: "#8B9B8B" }}>
                Expand your wardrobe
              </Text>
            </Pressable>
            <Pressable className="flex-1 bg-[#D4E5D4] rounded-2xl p-4 active:opacity-70">
              <StyledIonicons name="shirt-outline" size={28} style={{ color: "#8B9B8B" }} />
              <Text className="text-lg font-semibold mt-3 mb-1" style={{ color: "#686F60" }}>
                Create Outfit
              </Text>
              <Text className="text-sm" style={{ color: "#8B9B8B" }}>
                Mix & Match
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function OutfitCard({
  image,
  label,
  category,
}: {
  image: string;
  label: string;
  category: string;
}) {
  return (
    <Pressable className="active:opacity-70">
      <View className="w-35 h-45 rounded-xl overflow-hidden">
        <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute bottom-0 left-0 right-0 bg-black/40 p-3">
          <Text className="text-xs text-white/80 mb-1">{category}</Text>
          <Text className="text-sm font-semibold text-white">{label}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function ItemCard({ image, title, category }: { image: string; title: string; category: string }) {
  return (
    <Pressable className="active:opacity-70">
      <View className="w-27.5">
        <View className="w-27.5 h-40 rounded-xl overflow-hidden bg-[#F5F5F5] mb-2">
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="text-sm font-medium" style={{ color: "#686F60" }}>
          {title}
        </Text>
        <Text className="text-xs" style={{ color: "#A0A0A0" }}>
          {category}
        </Text>
      </View>
    </Pressable>
  );
}
