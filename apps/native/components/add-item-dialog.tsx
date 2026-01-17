import * as ImagePicker from "expo-image-picker";
import { Dialog, Spinner } from "heroui-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { FormInput } from "@/components/shared/form-input";
import { StyledIonicons } from "./ui/styled";

interface AddItemFormData {
  itemName: string;
  category: string;
  season: string;
  color: string;
}

interface AddItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddItemFormData & { image?: string }) => void;
}

// const categories = ["Tops", "Bottoms", "Outwear", "Shoes", "Accessories"];
// const seasons = ["Spring", "Summer", "Fall", "Winter", "All"];

export function AddItemDialog({ isOpen, onOpenChange, onSubmit }: AddItemDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const { control, handleSubmit, reset } = useForm<AddItemFormData>({
    defaultValues: {
      itemName: "",
      category: "",
      season: "",
      color: "",
    },
  });

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onFormSubmit = async (data: AddItemFormData) => {
    setIsLoading(true);
    try {
      await onSubmit({
        ...data,
        category: selectedCategory,
        season: selectedSeason,
        image: selectedImage || undefined,
      });
      reset();
      setSelectedImage(null);
      setSelectedCategory("");
      setSelectedSeason("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedImage(null);
    setSelectedCategory("");
    setSelectedSeason("");
    onOpenChange(false);
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="bg-white rounded-2xl mx-6 max-h-[90%]">
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <Pressable
              className="bg-white p-2 rounded-full shadow-sm active:opacity-70"
              onPress={handleCancel}
            >
              <StyledIonicons name="arrow-back" size={18} className="text-[#686F60]" />
            </Pressable>
            <Dialog.Title className="text-[16px] font-bold" style={{ color: "#686F60" }}>
              Add Item
            </Dialog.Title>
          </View>
        </View>

        <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
          <View className="gap-10">
            {/* Image Upload Section */}
            <View className="gap-4">
              <Pressable
                className="border-[0.5px] border-dashed rounded-md h-23.75 items-center justify-center gap-2 active:opacity-70"
                style={{ borderColor: "#828282" }}
                onPress={handleTakePhoto}
              >
                <StyledIonicons name="camera-outline" size={24} className="text-[#828282]" />
                <Text className="text-[12px]" style={{ color: "#828282" }}>
                  Take Photo
                </Text>
              </Pressable>

              <View className="items-center px-2.5">
                <Text className="text-[14px]" style={{ color: "#686F60" }}>
                  OR
                </Text>
              </View>

              <Pressable
                className="border-[0.5px] border-dashed rounded-md h-23.75 items-center justify-center gap-2 active:opacity-70"
                style={{ borderColor: "#828282" }}
                onPress={handleUpload}
              >
                <StyledIonicons name="cloud-upload-outline" size={24} className="text-[#828282]" />
                <Text className="text-[12px]" style={{ color: "#828282" }}>
                  Upload
                </Text>
              </Pressable>
            </View>

            {/* Form Fields */}
            <View className="gap-4">
              <FormInput
                control={control}
                name="itemName"
                label="Item Name"
                placeholder="e.g., Blue Denim Jacket"
                inputClassName="border-[0.5px] border-[#828282] rounded-md px-4 py-3 text-[12px]"
              />

              <View className="flex-row gap-4">
                <View className="flex-1 gap-2">
                  <Text className="text-[14px] font-medium" style={{ color: "#828282" }}>
                    Category
                  </Text>
                  <Pressable
                    className="border-[0.5px] border-[#828282] rounded-md px-4 py-3 flex-row items-center justify-between active:opacity-70"
                    onPress={() => {
                      // Show category picker
                    }}
                  >
                    <Text className="text-[12px]" style={{ color: "#828282" }}>
                      {selectedCategory || "Select"}
                    </Text>
                    <StyledIonicons name="chevron-down" size={16} className="text-[#828282]" />
                  </Pressable>
                </View>

                <View className="flex-1 gap-2">
                  <Text className="text-[14px] font-medium" style={{ color: "#828282" }}>
                    Season
                  </Text>
                  <Pressable
                    className="border-[0.5px] border-[#828282] rounded-md px-4 py-3 flex-row items-center justify-between active:opacity-70"
                    onPress={() => {
                      // Show season picker
                    }}
                  >
                    <Text className="text-[12px]" style={{ color: "#828282" }}>
                      {selectedSeason || "Select"}
                    </Text>
                    <StyledIonicons name="chevron-down" size={16} className="text-[#828282]" />
                  </Pressable>
                </View>
              </View>

              <FormInput
                control={control}
                name="color"
                label="Color"
                placeholder="e.g., Blue"
                inputClassName="border-[0.5px] border-[#828282] rounded-md px-4 py-3 text-[12px]"
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center justify-between gap-3 pb-6">
              <Pressable
                onPress={handleCancel}
                className="flex-1 h-10.5 rounded-md border border-[#686F60] items-center justify-center active:opacity-70"
              >
                <Text className="text-[14px]" style={{ color: "#686F60" }}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSubmit(onFormSubmit)}
                disabled={isLoading}
                className="flex-1 h-10.5 rounded-md items-center justify-center active:opacity-70"
                style={{
                  backgroundColor: "#686F60",
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                {isLoading ? (
                  <Spinner size="sm" color="default" />
                ) : (
                  <Text className="text-[14px] text-white">Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Dialog.Content>
    </Dialog>
  );
}
