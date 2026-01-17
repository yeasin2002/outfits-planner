import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { withUniwind } from "uniwind";

import { AddItemDialog } from "@/components/add-item-dialog";
import { CategoryFilter } from "@/components/category-filter";
import { WardrobeItemCard } from "@/components/wardrobe-item-card";

const StyledIonicons = withUniwind(Ionicons);

// Sample wardrobe data
const wardrobeItems = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    title: "T-shirt",
    category: "Tops",
    color: "Brown",
    season: "Summer",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    title: "T-shirt",
    category: "Tops",
    color: "Brown",
    season: "Summer",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    title: "T-shirt",
    category: "Tops",
    color: "Brown",
    season: "Summer",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    title: "Watch",
    category: "Accessories",
    color: "Brown",
    season: "All",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
    title: "T-shirt",
    category: "Tops",
    color: "Brown",
    season: "Summer",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    title: "Sneakers",
    category: "Shoes",
    color: "White",
    season: "All",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    title: "Heel",
    category: "Shoes",
    color: "Brown",
    season: "Summer",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
    title: "Sun-glass",
    category: "Accessories",
    color: "Yellow",
    season: "All",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    title: "Sun-glass",
    category: "Accessories",
    color: "Yellow",
    season: "All",
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
    title: "Pant",
    category: "Bottoms",
    color: "Brown",
    season: "All",
  },
];

const categories = ["All", "Tops", "Bottoms", "Outwear", "Shoes", "Accessories"];

export default function Wardrobe() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddItem = (data: any) => {
    console.log("New item:", data);
    // TODO: Add item to wardrobe
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-[16px] font-bold" style={{ color: "#686F60" }}>
              MY Wardrobe
            </Text>
            <Pressable
              className="bg-[#F7F5ED] p-2 rounded-md active:opacity-70"
              onPress={() => setIsAddDialogOpen(true)}
            >
              <StyledIonicons name="add" size={16} className="text-main-primary" />
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-4">
          <View className="bg-[#F7F5ED] rounded-full flex-row items-center px-4 h-[44px]">
            <TextInput
              className="flex-1 text-[14px]"
              placeholder="Search your wardrobe"
              placeholderTextColor="#828282"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable
              className="bg-[#686F60] p-2 rounded-full active:opacity-70"
              onPress={() => {
                // Search action
              }}
            >
              <StyledIonicons name="search" size={18} className="text-white" />
            </Pressable>
          </View>
        </View>

        {/* Category Filter */}
        <View className="mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </View>

        {/* Items Count */}
        <View className="px-6 mb-4">
          <Text className="text-[16px] font-bold" style={{ color: "#686F60" }}>
            {wardrobeItems.length} Items
          </Text>
        </View>

        {/* Wardrobe Grid */}
        <View className="px-6 pb-24">
          <View className="flex-row flex-wrap gap-4">
            {wardrobeItems.map((item) => (
              <WardrobeItemCard
                key={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                color={item.color}
                season={item.season}
                onPress={() => {
                  // Navigate to item details
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Item Dialog */}
      <AddItemDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddItem}
      />

      {/* Add Item Dialog */}
      <AddItemDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddItem}
      />
    </View>
  );
}
