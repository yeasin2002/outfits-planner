import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image } from "react-native";
import { z } from "zod";

import { FormInput } from "@/components/shared/form-input";
import { StyledIonicons, StyledPressable, StyledText, StyledView } from "@/components/ui/styled";

// Zod validation schema
const editSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type EditSettingsFormData = z.infer<typeof editSettingsSchema>;

export default function EditSettings() {
  const { control, handleSubmit } = useForm<EditSettingsFormData>({
    resolver: zodResolver(editSettingsSchema),
    defaultValues: {
      name: "Hafsa Binte Kalam",
      email: "hello.hafsabinte@gmail.com",
    },
  });

  function onSubmit(data: EditSettingsFormData) {
    console.log("Form data:", data);
    // Handle form submission here
  }

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="px-6 pt-4 pb-6">
        <StyledView className="flex-row items-center justify-between">
          <StyledView className="flex-row items-center gap-4">
            {/* Back Button */}
            <StyledPressable
              onPress={() => router.back()}
              className="w-8 h-8 rounded-full bg-white items-center justify-center active:opacity-70"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3.556 },
                shadowOpacity: 0.1,
                shadowRadius: 5.333,
                elevation: 4,
              }}
            >
              <StyledIonicons name="arrow-back" size={18} className="text-black" />
            </StyledPressable>

            {/* Title */}
            <StyledText
              className="text-main-primary"
              style={{
                fontFamily: "Caudex_700Bold",
                fontSize: 16,
                lineHeight: 19.2,
              }}
            >
              Edit Settings
            </StyledText>
          </StyledView>

          {/* Check Icon */}
          <StyledPressable onPress={handleSubmit(onSubmit)} className="active:opacity-70">
            <StyledIonicons name="checkmark" size={20} className="text-main-primary" />
          </StyledPressable>
        </StyledView>
      </StyledView>

      {/* Content */}
      <StyledView className="px-6">
        {/* Profile Image */}
        <StyledView className="items-center mb-10">
          <StyledView
            className="w-28 h-28 rounded-lg items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#B8A8D8" }}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/112" }}
              className="w-full h-full opacity-80"
              style={{ borderRadius: 6.788 }}
            />
            <StyledView className="absolute items-center justify-center">
              <StyledIonicons name="camera-outline" size={24} className="text-white" />
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Form Fields */}
        <StyledView className="gap-4">
          <FormInput
            control={control}
            name="name"
            label="Name"
            placeholder="Hafsa Binte Kalam"
            inputClassName="border-[#828282] border-[0.5px] rounded-[5px] px-4 h-[42px]"
            labelClassName="text-[#828282] mb-2"
            labelStyle={{
              fontFamily: "Lora_500Medium",
              fontSize: 14,
              lineHeight: 16.8,
            }}
          />

          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="hello.hafsabinte@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            inputClassName="border-[#828282] border-[0.5px] rounded-[5px] px-4 h-[42px]"
            labelClassName="text-[#828282] mb-2"
            labelStyle={{
              fontFamily: "Lora_500Medium",
              fontSize: 14,
              lineHeight: 16.8,
            }}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
