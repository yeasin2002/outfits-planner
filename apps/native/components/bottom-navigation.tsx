import type { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyledIonicons, StyledMaterialIcons } from "./ui/styled";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
type MaterialIconsName = React.ComponentProps<typeof MaterialIcons>["name"];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      icon: "home" as IoniconsName,
      iconOutline: "home-outline" as IoniconsName,
      path: "/(drawer)",
      IconComponent: StyledIonicons,
    },
    {
      name: "Wardrobe",
      icon: "checkroom" as MaterialIconsName,
      iconOutline: "checkroom" as MaterialIconsName,
      path: "/(drawer)/wardrobe",
      IconComponent: StyledMaterialIcons,
    },
    {
      name: "Outfits",
      icon: "shirt" as IoniconsName,
      iconOutline: "shirt-outline" as IoniconsName,
      path: "/(drawer)/outfits",
      IconComponent: StyledIonicons,
    },
    {
      name: "Settings",
      icon: "settings" as IoniconsName,
      iconOutline: "settings-outline" as IoniconsName,
      path: "/(drawer)/settings",
      IconComponent: StyledIonicons,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/(drawer)") {
      return pathname === "/" || pathname === "/(drawer)";
    }
    return pathname.includes(path);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[#686F60] flex-row items-center justify-around py-4 px-6">
      {navItems.map((item) => {
        const active = isActive(item.path);
        const IconComponent = item.IconComponent;

        return (
          <Pressable
            key={item.name}
            className="items-center active:opacity-70"
            onPress={() => router.push(item.path as any)}
          >
            {active && item.name === "Wardrobe" ? (
              <View className="items-center">
                <Text className="text-base font-bold text-white mb-1">{item.name}</Text>
                <View className="w-3 h-3 bg-[#EE9250] rounded-full" />
              </View>
            ) : (
              <>
                <IconComponent
                  name={(active ? item.icon : item.iconOutline) as any}
                  size={24}
                  className="text-white mb-1"
                />
                <Text className={`text-xs text-white ${!active && "opacity-70"}`}>{item.name}</Text>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
