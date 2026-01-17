import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyledIonicons, StyledMaterialIcons } from "./ui/styled";

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      icon: "home",
      iconOutline: "home-outline",
      path: "/(drawer)",
      IconComponent: StyledIonicons,
    },
    {
      name: "Wardrobe",
      icon: "checkroom",
      iconOutline: "checkroom",
      path: "/(drawer)/wardrobe",
      IconComponent: StyledMaterialIcons,
    },
    {
      name: "Outfits",
      icon: "shirt",
      iconOutline: "shirt-outline",
      path: "/(drawer)/outfits",
      IconComponent: StyledIonicons,
    },
    {
      name: "Settings",
      icon: "settings",
      iconOutline: "settings-outline",
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
                  name={active ? item.icon : item.iconOutline}
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
