import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface WardrobeItemCardProps {
  image: string;
  title: string;
  category: string;
  color: string;
  season: string;
  onPress?: () => void;
}

export function WardrobeItemCard({
  image,
  title,
  category,
  color,
  season,
  onPress,
}: WardrobeItemCardProps) {
  return (
    <Pressable className="w-[165px] active:opacity-70" onPress={onPress}>
      <View className="bg-white">
        {/* Image */}
        <View className="h-[222px] w-full rounded-lg overflow-hidden bg-[#F5F5F5]">
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        </View>

        {/* Info */}
        <View className="px-1.5 pt-1.5 gap-1">
          {/* Title */}
          <Text className="text-[14px]" style={{ color: "#686F60" }}>
            {title}
          </Text>

          {/* Category & Color */}
          <View className="flex-row items-center gap-0.5">
            <Text className="text-[10px]" style={{ color: "#B48B5F" }}>
              {category}
            </Text>
            <Ionicons name="ellipse" size={4} color="#B48B5F" />
            <Text className="text-[10px]" style={{ color: "#B48B5F" }}>
              {color}
            </Text>
          </View>

          {/* Season Tag */}
          <View
            className="self-start px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#FAE0BD" }}
          >
            <Text className="text-[10px]" style={{ color: "#828282" }}>
              {season}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
