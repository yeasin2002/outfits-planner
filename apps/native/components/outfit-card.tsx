import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { withUniwind } from "uniwind";
import { StyledIonicons } from "./ui/styled";

interface OutfitCardProps {
  id: number;
  title: string;
  category: string;
  image: string;
  isFavorite: boolean;
  onPress?: () => void;
  onToggleFavorite?: (id: number) => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  id,
  title,
  category,
  image,
  isFavorite,
  onPress,
  onToggleFavorite,
}) => {
  return (
    <Pressable className="w-[165px] bg-white active:opacity-90" onPress={onPress}>
      <View className="h-[222px] rounded-lg overflow-hidden relative">
        <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />

        {/* Favorite Button */}
        <Pressable
          className="absolute top-3 right-3 w-6 h-6 rounded-full items-center justify-center active:opacity-70"
          style={{
            backgroundColor: isFavorite ? "rgba(255, 0, 0, 0.14)" : "rgba(255, 255, 255, 0.3)",
          }}
          onPress={() => onToggleFavorite?.(id)}
        >
          <StyledIonicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            className={isFavorite ? "text-red-500" : "text-white"}
          />
        </Pressable>

        {/* Overlay Info */}
        <View className="absolute left-2 bottom-2 gap-1.5">
          <View
            className="px-2.5 py-1 rounded-full self-start"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <Text
              className="text-white text-[10px]"
              style={{
                fontFamily: "Lora_400Regular",
                lineHeight: 12,
              }}
            >
              {category}
            </Text>
          </View>
          <Text
            className="text-white text-[14px]"
            style={{
              fontFamily: "Lora_400Regular",
              lineHeight: 16.8,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
