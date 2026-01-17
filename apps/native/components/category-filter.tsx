import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
      <View className="flex-row gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <Pressable
              key={category}
              className="h-[30px] px-3 py-1 rounded-full active:opacity-70"
              style={{
                backgroundColor: isActive ? "#686F60" : "#F3F3F3",
              }}
              onPress={() => onCategoryChange(category)}
            >
              <Text
                className="text-[14px] text-center"
                style={{
                  color: isActive ? "#FFFFFF" : "#828282",
                }}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
